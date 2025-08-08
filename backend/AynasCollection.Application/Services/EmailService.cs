using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Options;

namespace AynasCollection.Application.Services
{
    public interface IEmailService
    {
        Task SendVerificationEmailAsync(string email, string token, string userName);
        Task SendPasswordResetEmailAsync(string email, string token, string userName);
        Task SendWelcomeEmailAsync(string email, string userName);
        Task SendOrderConfirmationEmailAsync(string email, string orderNumber, string userName);
    }

    public class EmailSettings
    {
        public string SmtpServer { get; set; } = string.Empty;
        public int SmtpPort { get; set; }
        public string SmtpUsername { get; set; } = string.Empty;
        public string SmtpPassword { get; set; } = string.Empty;
        public string FromEmail { get; set; } = string.Empty;
        public string FromName { get; set; } = string.Empty;
        public string BaseUrl { get; set; } = string.Empty;
    }

    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendVerificationEmailAsync(string email, string token, string userName)
        {
            var verificationLink = $"{_emailSettings.BaseUrl}/verify-email?token={token}&email={email}";

            var subject = "Welcome to Aynas Collection - Verify Your Email";
            var body = GenerateVerificationEmailBody(userName, verificationLink);

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendPasswordResetEmailAsync(string email, string token, string userName)
        {
            var resetLink = $"{_emailSettings.BaseUrl}/reset-password?token={token}&email={email}";

            var subject = "Aynas Collection - Password Reset Request";
            var body = GeneratePasswordResetEmailBody(userName, resetLink);

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendWelcomeEmailAsync(string email, string userName)
        {
            var subject = "Welcome to Aynas Collection!";
            var body = GenerateWelcomeEmailBody(userName);

            await SendEmailAsync(email, subject, body);
        }

        public async Task SendOrderConfirmationEmailAsync(string email, string orderNumber, string userName)
        {
            var subject = $"Order Confirmation - {orderNumber}";
            var body = GenerateOrderConfirmationEmailBody(userName, orderNumber);

            await SendEmailAsync(email, subject, body);
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                using var client = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(_emailSettings.SmtpUsername, _emailSettings.SmtpPassword)
                };

                var message = new MailMessage
                {
                    From = new MailAddress(_emailSettings.FromEmail, _emailSettings.FromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                message.To.Add(toEmail);
                await client.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                // Log the error but don't throw to prevent registration from failing
                Console.WriteLine($"Email sending failed: {ex.Message}");
            }
        }

        private string GenerateVerificationEmailBody(string userName, string verificationLink)
        {
            return $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='utf-8'>
                    <title>Verify Your Email</title>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                        .button {{ display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }}
                        .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Aynas Collection</h1>
                            <p>Premium Fashion & Lifestyle</p>
                        </div>
                        <div class='content'>
                            <h2>Welcome, {userName}!</h2>
                            <p>Thank you for registering with Aynas Collection. To complete your registration and start shopping, please verify your email address by clicking the button below:</p>

                            <div style='text-align: center; margin: 30px 0;'>
                                <a href='{verificationLink}' class='button'>Verify Email Address</a>
                            </div>

                            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                            <p style='word-break: break-all; color: #666;'>{verificationLink}</p>

                            <p>This link will expire in 24 hours for security reasons.</p>

                            <p>If you didn't create an account with Aynas Collection, please ignore this email.</p>
                        </div>
                        <div class='footer'>
                            <p>&copy; 2024 Aynas Collection. All rights reserved.</p>
                            <p>This is an automated email, please do not reply.</p>
                        </div>
                    </div>
                </body>
                </html>";
        }

        private string GeneratePasswordResetEmailBody(string userName, string resetLink)
        {
            return $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='utf-8'>
                    <title>Password Reset</title>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                        .button {{ display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }}
                        .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Aynas Collection</h1>
                            <p>Password Reset Request</p>
                        </div>
                        <div class='content'>
                            <h2>Hello, {userName}!</h2>
                            <p>We received a request to reset your password for your Aynas Collection account. Click the button below to create a new password:</p>

                            <div style='text-align: center; margin: 30px 0;'>
                                <a href='{resetLink}' class='button'>Reset Password</a>
                            </div>

                            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                            <p style='word-break: break-all; color: #666;'>{resetLink}</p>

                            <p>This link will expire in 1 hour for security reasons.</p>

                            <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
                        </div>
                        <div class='footer'>
                            <p>&copy; 2024 Aynas Collection. All rights reserved.</p>
                            <p>This is an automated email, please do not reply.</p>
                        </div>
                    </div>
                </body>
                </html>";
        }

        private string GenerateWelcomeEmailBody(string userName)
        {
            return $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='utf-8'>
                    <title>Welcome to Aynas Collection</title>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                        .button {{ display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }}
                        .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Aynas Collection</h1>
                            <p>Welcome to Premium Fashion</p>
                        </div>
                        <div class='content'>
                            <h2>Welcome to Aynas Collection, {userName}!</h2>
                            <p>Your email has been successfully verified and your account is now active. Welcome to the Aynas Collection family!</p>

                            <p>Here's what you can do now:</p>
                            <ul>
                                <li>Browse our premium collection of fashion items</li>
                                <li>Create your personal wishlist</li>
                                <li>Enjoy exclusive member benefits</li>
                                <li>Get early access to sales and new arrivals</li>
                            </ul>

                            <div style='text-align: center; margin: 30px 0;'>
                                <a href='{_emailSettings.BaseUrl}/products' class='button'>Start Shopping</a>
                            </div>

                            <p>Thank you for choosing Aynas Collection. We're excited to have you as part of our community!</p>
                        </div>
                        <div class='footer'>
                            <p>&copy; 2024 Aynas Collection. All rights reserved.</p>
                            <p>This is an automated email, please do not reply.</p>
                        </div>
                    </div>
                </body>
                </html>";
        }

        private string GenerateOrderConfirmationEmailBody(string userName, string orderNumber)
        {
            return $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='utf-8'>
                    <title>Order Confirmation</title>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                        .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Aynas Collection</h1>
                            <p>Order Confirmation</p>
                        </div>
                        <div class='content'>
                            <h2>Thank you for your order, {userName}!</h2>
                            <p>Your order has been successfully placed and is being processed.</p>

                            <h3>Order Details:</h3>
                            <p><strong>Order Number:</strong> {orderNumber}</p>
                            <p><strong>Order Date:</strong> {DateTime.UtcNow:MMMM dd, yyyy}</p>

                            <p>We'll send you an email with tracking information once your order ships.</p>

                            <p>If you have any questions about your order, please contact our customer support team.</p>
                        </div>
                        <div class='footer'>
                            <p>&copy; 2024 Aynas Collection. All rights reserved.</p>
                            <p>This is an automated email, please do not reply.</p>
                        </div>
                    </div>
                </body>
                </html>";
        }
    }
}
