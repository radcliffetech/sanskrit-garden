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
    },
  },
  adminEmail: "jeffrey.radcliffe@gmail.com",
  siteTitle: "Sanskrit Garden",
  siteDescription: "Sanskrit Learning Resources",
};

export default nexusConfig;
