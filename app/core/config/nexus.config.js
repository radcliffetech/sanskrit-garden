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
    curations: {
      nouns: {
        collectionId: "nouns",
        version: "1",
      },
      jokes: {
        collectionId: "jokes",
        version: "1",
      },
      verbs: {
        collectionId: "verbs",
        version: "1",
      },
    },
  },
  adminEmail: "jeffrey.radcliffe@gmail.com",
  siteTitle: "Sanskrit Garden",
  siteDescription: "Sanskrit Learning Resources",
};

export default nexusConfig;
