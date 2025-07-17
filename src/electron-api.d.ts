export {};

declare global {
  interface Window {
    electronAPI: {
      selectLightburnExe: () => Promise<string | undefined>;
      loadLightburnPath: () => Promise<string | undefined>;
      logEvent: (
        logType: string,
        event: string,
        details?: Record<string, any>
      ) => void;
      launchLightBurn: (lightburnPath: string) => void;
      onLightburnStatusChange: (
        callback: (status: { running: boolean; exited: boolean }) => void
      ) => void;
      exitLaserLog: () => void;
      openLogsWindow: (fileName: string) => void;
      listLaserJobLogFiles: () => Promise<string[]>;
      openLogFile: (fileName: string) => Promise<string | undefined>;
    };
  }
}
