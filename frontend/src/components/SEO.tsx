import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  product?: {
    name: string;
    price: number;
    description: string;
    image: string;
    brand: string;
    availability: string;
  };
}

const SEO: React.FC<SEOProps> = ({
  title = "Aynas Collection - Premium Fashion & Lifestyle",
  description = "Discover premium fashion and lifestyle products at Aynas Collection. Shop elegant dresses, stylish t-shirts, modern jeans, and trendy accessories.",
  image = "https://brave-moss-071279d03.2.azurestaticapps.net/static/media/logo512.png",
  url = "https://brave-moss-071279d03.2.azurestaticapps.net/",
  type = "website",
  keywords = "fashion, clothing, dresses, t-shirts, jeans, jackets, accessories, premium fashion, lifestyle, style, trendy, elegant, Aynas Collection",
  product
}) => {
  const fullTitle = title.includes("Aynas Collection") ? title : `${title} | Aynas Collection`;
  const fullUrl = url.startsWith('http') ? url : `https://brave-moss-071279d03.2.azurestaticapps.net${url}`;
  const fullImage = image.startsWith('http') ? image : `https://brave-moss-071279d03.2.azurestaticapps.net${image}`;

  // Generate structured data for products
  const productStructuredData = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": product.availability,
      "seller": {
        "@type": "Organization",
        "name": "Aynas Collection"
      }
    }
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Aynas Collection" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* WhatsApp */}
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={fullTitle} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Product-specific structured data */}
      {productStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
