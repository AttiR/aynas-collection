using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AynasCollection.Core.Entities;
using AynasCollection.Infrastructure.Data;
using AynasCollection.Application.DTOs;
using AynasCollection.Application.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AynasCollection.Application.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<AuthResponse> VerifyEmailAsync(string email, string token);
        Task<bool> ForgotPasswordAsync(string email);
        Task<bool> ResetPasswordAsync(string email, string token, string newPassword);
        Task<AuthResponse> RefreshTokenAsync(string refreshToken);
        Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword);
        Task<UserDto> GetUserProfileAsync(int userId);
        Task<bool> UpdateProfileAsync(int userId, UpdateProfileRequest request);
        Task<bool> ResendVerificationEmailAsync(string email);
    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly IEmailService _emailService;

        public AuthService(ApplicationDbContext context, IOptions<JwtSettings> jwtSettings, IEmailService emailService)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
            _emailService = emailService;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                throw new InvalidOperationException("User with this email already exists.");
            }

            // Create password hash
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Generate email verification token
            var verificationToken = GenerateSecureToken();
            var tokenExpiry = DateTime.UtcNow.AddHours(24);

            // Create user
            var user = new User
            {
                Email = request.Email,
                PasswordHash = passwordHash,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                IsEmailVerified = false,
                EmailVerificationToken = verificationToken,
                EmailVerificationTokenExpiry = tokenExpiry,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Send verification email
            await _emailService.SendVerificationEmailAsync(user.Email, verificationToken, user.FirstName);

            return new AuthResponse
            {
                Success = true,
                Message = "Registration successful. Please check your email to verify your account.",
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    IsEmailVerified = user.IsEmailVerified
                }
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                throw new InvalidOperationException("Invalid email or password.");
            }

            // Check if account is locked
            if (user.LockoutEnd.HasValue && user.LockoutEnd > DateTime.UtcNow)
            {
                var lockoutTime = user.LockoutEnd.Value - DateTime.UtcNow;
                throw new InvalidOperationException($"Account is locked. Please try again in {lockoutTime.Minutes} minutes.");
            }

            // Verify password
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                await HandleFailedLoginAttempt(user);
                throw new InvalidOperationException("Invalid email or password.");
            }

            // Check if email is verified
            if (!user.IsEmailVerified)
            {
                throw new InvalidOperationException("Please verify your email address before logging in.");
            }

            // Reset login attempts on successful login
            user.LoginAttempts = 0;
            user.LastLoginAttempt = DateTime.UtcNow;
            user.LockoutEnd = null;
            await _context.SaveChangesAsync();

            // Generate tokens
            var token = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            // Save refresh token
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful.",
                Token = token,
                RefreshToken = refreshToken,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    IsEmailVerified = user.IsEmailVerified,
                    Role = user.Role
                }
            };
        }

        public async Task<AuthResponse> VerifyEmailAsync(string email, string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                throw new InvalidOperationException("Invalid verification link.");
            }

            if (user.IsEmailVerified)
            {
                throw new InvalidOperationException("Email is already verified.");
            }

            if (user.EmailVerificationToken != token)
            {
                throw new InvalidOperationException("Invalid verification token.");
            }

            if (user.EmailVerificationTokenExpiry < DateTime.UtcNow)
            {
                throw new InvalidOperationException("Verification token has expired. Please request a new one.");
            }

            // Verify email
            user.IsEmailVerified = true;
            user.EmailVerifiedAt = DateTime.UtcNow;
            user.EmailVerificationToken = null;
            user.EmailVerificationTokenExpiry = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Send welcome email
            await _emailService.SendWelcomeEmailAsync(user.Email, user.FirstName);

            return new AuthResponse
            {
                Success = true,
                Message = "Email verified successfully. You can now log in to your account.",
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    IsEmailVerified = user.IsEmailVerified
                }
            };
        }

        public async Task<bool> ForgotPasswordAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                // Don't reveal if user exists or not
                return true;
            }

            // Generate password reset token
            var resetToken = GenerateSecureToken();
            var tokenExpiry = DateTime.UtcNow.AddHours(1);

            user.PasswordResetToken = resetToken;
            user.PasswordResetTokenExpiry = tokenExpiry;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Send password reset email
            await _emailService.SendPasswordResetEmailAsync(user.Email, resetToken, user.FirstName);

            return true;
        }

        public async Task<bool> ResetPasswordAsync(string email, string token, string newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                throw new InvalidOperationException("Invalid reset link.");
            }

            if (user.PasswordResetToken != token)
            {
                throw new InvalidOperationException("Invalid reset token.");
            }

            if (user.PasswordResetTokenExpiry < DateTime.UtcNow)
            {
                throw new InvalidOperationException("Reset token has expired. Please request a new one.");
            }

            // Update password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<AuthResponse> RefreshTokenAsync(string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiry < DateTime.UtcNow)
            {
                throw new InvalidOperationException("Invalid refresh token.");
            }

            // Generate new tokens
            var newToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            // Update refresh token
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Success = true,
                Token = newToken,
                RefreshToken = newRefreshToken,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    IsEmailVerified = user.IsEmailVerified,
                    Role = user.Role
                }
            };
        }

        public async Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
            {
                throw new InvalidOperationException("Current password is incorrect.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<UserDto> GetUserProfileAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                City = user.City,
                State = user.State,
                ZipCode = user.ZipCode,
                Country = user.Country,
                IsEmailVerified = user.IsEmailVerified,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<bool> UpdateProfileAsync(int userId, UpdateProfileRequest request)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;
            user.Address = request.Address;
            user.City = request.City;
            user.State = request.State;
            user.ZipCode = request.ZipCode;
            user.Country = request.Country;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ResendVerificationEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            if (user.IsEmailVerified)
            {
                throw new InvalidOperationException("Email is already verified.");
            }

            // Generate new verification token
            var verificationToken = GenerateSecureToken();
            var tokenExpiry = DateTime.UtcNow.AddHours(24);

            user.EmailVerificationToken = verificationToken;
            user.EmailVerificationTokenExpiry = tokenExpiry;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Send verification email
            await _emailService.SendVerificationEmailAsync(user.Email, verificationToken, user.FirstName);

            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(_jwtSettings.ExpirationHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        }

        private string GenerateSecureToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
        }

        private async Task HandleFailedLoginAttempt(User user)
        {
            user.LoginAttempts++;
            user.LastLoginAttempt = DateTime.UtcNow;

            // Lock account after 5 failed attempts for 15 minutes
            if (user.LoginAttempts >= 5)
            {
                user.LockoutEnd = DateTime.UtcNow.AddMinutes(15);
            }

            await _context.SaveChangesAsync();
        }
    }
}
