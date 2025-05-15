/**
 *  nexus.config.js
 *
 * This file contains master configuration for the Nexus application.
 *
 */

const nexusConfig = {
  firestore: {
    collections: {
      articles: "articles_v1",

      shabda: "shabda_v1",
      shabdaRequests: "shabda_generation_requests_v1",
      shabdaAudit: "shabda_audit_v1",
      shabdaReviews: "shabda_reviews_v1",
    },
  },
  adminEmail: "jeffrey.radcliffe@gmail.com",
  siteTitle: "Sanskrit Garden",
  siteDescription: "Sanskrit Learning Resources",
};

export default nexusConfig;
