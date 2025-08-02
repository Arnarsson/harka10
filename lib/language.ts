export type Language = 'en' | 'da';

export interface Translations {
  // Navigation
  dashboard: string;
  courses: string;
  team: string;
  aiAssistant: string;
  notes: string;
  certificates: string;
  programs: string;
  analytics: string;
  settings: string;
  language: string;
  
  // Common actions
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  create: string;
  continue: string;
  start: string;
  complete: string;
  
  // Learning platform
  progress: string;
  lesson: string;
  module: string;
  quiz: string;
  assignment: string;
  certificate: string;
  bookmark: string;
  note: string;
  
  // Team features
  invite: string;
  member: string;
  admin: string;
  instructor: string;
  student: string;
  pending: string;
  active: string;
  
  // AI Assistant
  askQuestion: string;
  example: string;
  suggestion: string;
  chat: string;
  
  // Time and dates
  today: string;
  yesterday: string;
  thisWeek: string;
  thisMonth: string;
  
  // Status messages
  loading: string;
  error: string;
  success: string;
  warning: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    courses: 'Courses',
    team: 'Team',
    aiAssistant: 'AI Assistant',
    notes: 'Notes & Bookmarks',
    certificates: 'Certificates',
    programs: '48-Hour Program',
    analytics: 'Analytics',
    settings: 'Settings',
    language: 'Language',
    
    // Common actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    create: 'Create',
    continue: 'Continue',
    start: 'Start',
    complete: 'Complete',
    
    // Learning platform
    progress: 'Progress',
    lesson: 'Lesson',
    module: 'Module',
    quiz: 'Quiz',
    assignment: 'Assignment',
    certificate: 'Certificate',
    bookmark: 'Bookmark',
    note: 'Note',
    
    // Team features
    invite: 'Invite',
    member: 'Member',
    admin: 'Admin',
    instructor: 'Instructor',
    student: 'Student',
    pending: 'Pending',
    active: 'Active',
    
    // AI Assistant
    askQuestion: 'Ask a question',
    example: 'Example',
    suggestion: 'Suggestion',
    chat: 'Chat',
    
    // Time and dates
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This week',
    thisMonth: 'This month',
    
    // Status messages
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning'
  },
  
  da: {
    // Navigation
    dashboard: 'Dashboard',
    courses: 'Kurser',
    team: 'Team',
    aiAssistant: 'AI Assistent',
    notes: 'Noter & Bogmærker',
    certificates: 'Certifikater',
    programs: '48-Timers Program',
    analytics: 'Analyser',
    settings: 'Indstillinger',
    language: 'Sprog',
    
    // Common actions
    save: 'Gem',
    cancel: 'Annuller',
    delete: 'Slet',
    edit: 'Rediger',
    add: 'Tilføj',
    create: 'Opret',
    continue: 'Fortsæt',
    start: 'Start',
    complete: 'Fuldfør',
    
    // Learning platform
    progress: 'Fremskridt',
    lesson: 'Lektion',
    module: 'Modul',
    quiz: 'Quiz',
    assignment: 'Opgave',
    certificate: 'Certifikat',
    bookmark: 'Bogmærke',
    note: 'Note',
    
    // Team features
    invite: 'Inviter',
    member: 'Medlem',
    admin: 'Administrator',
    instructor: 'Instruktør',
    student: 'Studerende',
    pending: 'Afventer',
    active: 'Aktiv',
    
    // AI Assistant
    askQuestion: 'Stil et spørgsmål',
    example: 'Eksempel',
    suggestion: 'Forslag',
    chat: 'Chat',
    
    // Time and dates
    today: 'I dag',
    yesterday: 'I går',
    thisWeek: 'Denne uge',
    thisMonth: 'Denne måned',
    
    // Status messages
    loading: 'Indlæser...',
    error: 'Fejl',
    success: 'Succes',
    warning: 'Advarsel'
  }
};

// Language management utilities
export class LanguageManager {
  private static instance: LanguageManager;
  private currentLanguage: Language = 'en';
  private listeners: Array<(lang: Language) => void> = [];

  static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  constructor() {
    // Load language from localStorage on client side
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'en' || saved === 'da')) {
        this.currentLanguage = saved;
      }
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
    
    // Notify listeners
    this.listeners.forEach(listener => listener(language));
  }

  getTranslations(): Translations {
    return translations[this.currentLanguage];
  }

  t(key: keyof Translations): string {
    return translations[this.currentLanguage][key];
  }

  // Subscribe to language changes
  subscribe(listener: (lang: Language) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// React hook for using language in components
import { useState, useEffect } from 'react';

export function useLanguage() {
  const manager = LanguageManager.getInstance();
  const [language, setLanguage] = useState<Language>(manager.getCurrentLanguage());
  const [translations, setTranslations] = useState<Translations>(manager.getTranslations());

  useEffect(() => {
    const unsubscribe = manager.subscribe((newLang) => {
      setLanguage(newLang);
      setTranslations(manager.getTranslations());
    });

    return unsubscribe;
  }, [manager]);

  const changeLanguage = (newLang: Language) => {
    manager.setLanguage(newLang);
  };

  const t = (key: keyof Translations): string => {
    return translations[key];
  };

  return {
    language,
    translations,
    changeLanguage,
    t
  };
}

// Utility function for components that need translation outside hooks
export function getTranslation(key: keyof Translations, language?: Language): string {
  const lang = language || LanguageManager.getInstance().getCurrentLanguage();
  return translations[lang][key];
}