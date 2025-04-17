// This is a simplified translation system
// In a production app, you would use a more robust solution like i18next

// Sample translations for demonstration purposes
// In a real app, you would have complete translations for all languages
const translations = {
  // English (default)
  en: {
    // Navigation
    nav: {
      home: "Home",
      serviceIssues: "Service Issues",
      pressReleases: "Press Releases",
      governmentServices: "Government Services",
      communityHub: "Community Hub",
      dashboard: "Dashboard",
      login: "Log In",
      signup: "Sign Up"
    },
    // Common UI elements
    common: {
      search: "Search",
      filter: "Filter",
      all: "All",
      selectLanguage: "Select Language",
      loading: "Loading...",
      noResults: "No results found",
      readMore: "Read More",
      viewDetails: "View Details",
      share: "Share",
      save: "Save",
      download: "Download"
    },
    // Service Issues page
    serviceIssues: {
      title: "Service Issues",
      subtitle: "Track and report service disruptions in your area",
      reportIssue: "Report Issue",
      searchPlaceholder: "Search issues...",
      filters: "Filters",
      reportedIssues: "Reported Issues",
      selectToView: "Select an issue to view details"
    },
    // Press Releases page
    pressReleases: {
      title: "Press & Media Center",
      subtitle: "Stay informed about service delivery news and government proceedings",
      searchPlaceholder: "Search news and meetings...",
      newsTab: "News & Press Releases",
      meetingsTab: "Live & Recorded Meetings",
      filters: "Filters",
      pressReleasesList: "Press Releases",
      meetingsList: "Meetings",
      selectToView: "Select an item to view details",
      selectNewsPrompt: "Choose a press release from the list to read the full article",
      selectMeetingPrompt: "Select a meeting to watch the live stream or recording",
      live: "Live",
      recorded: "Recorded",
      scheduled: "Scheduled",
      watchLive: "Watch Live Stream",
      playRecording: "Play Recording",
      scheduledMeeting: "Scheduled Meeting",
      setReminder: "Set Reminder",
      aboutMeeting: "About this meeting"
    }
  },
  
  // Afrikaans
  af: {
    nav: {
      home: "Tuis",
      serviceIssues: "Diensprobleme",
      pressReleases: "Persverklarings",
      governmentServices: "Regeringsdienste",
      communityHub: "Gemeenskapsentrum",
      dashboard: "Kontrolepaneel",
      login: "Meld Aan",
      signup: "Registreer"
    },
    common: {
      search: "Soek",
      filter: "Filter",
      all: "Alles",
      selectLanguage: "Kies Taal",
      loading: "Laai...",
      noResults: "Geen resultate gevind",
      readMore: "Lees Meer",
      viewDetails: "Besonderhede",
      share: "Deel",
      save: "Stoor",
      download: "Aflaai"
    },
    serviceIssues: {
      title: "Diensprobleme",
      subtitle: "Volg en rapporteer diensonderbrekings in jou area",
      reportIssue: "Rapporteer Probleem",
      searchPlaceholder: "Soek probleme...",
      filters: "Filters",
      reportedIssues: "Gerapporteerde Probleme",
      selectToView: "Kies 'n probleem om besonderhede te sien"
    },
    pressReleases: {
      title: "Pers- en Mediasentrum",
      subtitle: "Bly ingelig oor diensleweringsnuus en regeringsverrigtinge",
      searchPlaceholder: "Soek nuus en vergaderings...",
      newsTab: "Nuus & Persverklarings",
      meetingsTab: "Regstreekse & Opgenome Vergaderings",
      filters: "Filters",
      pressReleasesList: "Persverklarings",
      meetingsList: "Vergaderings",
      selectToView: "Kies 'n item om besonderhede te sien",
      selectNewsPrompt: "Kies 'n persverklaring om die volledige artikel te lees",
      selectMeetingPrompt: "Kies 'n vergadering om die regstreekse stroom of opname te kyk",
      live: "Regstreeks",
      recorded: "Opgeneem",
      scheduled: "Geskeduleer",
      watchLive: "Kyk Regstreekse Stroom",
      playRecording: "Speel Opname",
      scheduledMeeting: "Geskeduleerde Vergadering",
      setReminder: "Stel Herinnering",
      aboutMeeting: "Oor hierdie vergadering"
    }
  },
  
  // isiZulu
  zu: {
    nav: {
      home: "Ikhaya",
      serviceIssues: "Izinkinga Zosizo",
      pressReleases: "Izitatimende Zabezindaba",
      governmentServices: "Izinsiza Zikahulumeni",
      communityHub: "Isikhungo Somphakathi",
      dashboard: "Ideshibhodi",
      login: "Ngena",
      signup: "Bhalisela"
    },
    // Add more translations as needed
  },
  
  // isiXhosa
  xh: {
    nav: {
      home: "Ikhaya",
      serviceIssues: "Iingxaki Zenkonzo",
      pressReleases: "Iingxelo Zabezindaba",
      governmentServices: "Iinkonzo Zikarhulumente",
      communityHub: "Iziko Loluntu",
      dashboard: "Ideshibhodi",
      login: "Ngena",
      signup: "Bhalisela"
    },
    // Add more translations as needed
  },
  
  // Add more languages as needed
};

// Function to get a translation
export const getTranslation = (langCode, key) => {
  // Split the key by dots to access nested properties
  const keys = key.split('.');
  
  // Start with the language object
  let result = translations[langCode] || translations.en; // Fallback to English
  
  // Navigate through the nested properties
  for (const k of keys) {
    result = result[k];
    
    // If the key doesn't exist, fall back to English
    if (result === undefined) {
      let fallback = translations.en;
      for (const fk of keys) {
        fallback = fallback[fk];
        if (fallback === undefined) {
          return key; // If even English doesn't have it, return the key itself
        }
      }
      return fallback;
    }
  }
  
  return result;
};

// Translation hook for components
export const useTranslation = (langCode) => {
  return {
    t: (key) => getTranslation(langCode, key)
  };
};

export default translations;
