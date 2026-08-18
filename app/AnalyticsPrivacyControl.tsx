"use client";

import { useEffect, useState } from "react";
import {
  ANALYTICS_OPT_OUT_KEY,
  ANALYTICS_PREFERENCE_EVENT,
  browserPrivacySignalActive,
  setSiteAnalyticsOptOut,
  siteAnalyticsOptedOut,
} from "./SiteAnalytics";

type PrivacyState = {
  ready: boolean;
  optedOut: boolean;
  browserSignal: boolean;
};

export function AnalyticsPrivacyControl() {
  const [privacy, setPrivacy] = useState<PrivacyState>({
    ready: false,
    optedOut: false,
    browserSignal: false,
  });

  useEffect(() => {
    const refresh = () => {
      setPrivacy({
        ready: true,
        optedOut: siteAnalyticsOptedOut(),
        browserSignal: browserPrivacySignalActive(),
      });
    };
    const storageChanged = (event: StorageEvent) => {
      if (event.key === ANALYTICS_OPT_OUT_KEY) refresh();
    };

    refresh();
    window.addEventListener(ANALYTICS_PREFERENCE_EVENT, refresh);
    window.addEventListener("storage", storageChanged);
    return () => {
      window.removeEventListener(ANALYTICS_PREFERENCE_EVENT, refresh);
      window.removeEventListener("storage", storageChanged);
    };
  }, []);

  const disabled = privacy.optedOut || privacy.browserSignal;
  const status = privacy.browserSignal
    ? "La mesure d’audience est désactivée par le signal de confidentialité de votre navigateur."
    : privacy.optedOut
      ? "La mesure d’audience est désactivée sur ce navigateur."
      : "La mesure d’audience interne est active sur ce navigateur.";

  return (
    <div className="analytics-privacy-control">
      <p aria-live="polite">{privacy.ready ? status : "Chargement du réglage…"}</p>
      <button
        type="button"
        role="switch"
        aria-checked={privacy.optedOut}
        disabled={!privacy.ready}
        onClick={() => setSiteAnalyticsOptOut(!privacy.optedOut)}
      >
        {privacy.optedOut
          ? "Réactiver la mesure d’audience"
          : disabled
            ? "Mémoriser ce refus sur ce navigateur"
            : "Désactiver la mesure d’audience"}
      </button>
    </div>
  );
}
