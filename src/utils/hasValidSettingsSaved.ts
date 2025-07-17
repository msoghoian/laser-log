/**
 * @description - This function checks if the settings file exists and if it
 * contains a path to the LightBurn application.
 *
 * @returns {Promise<boolean>} - Returns true if the settings are valid, returns
 * false if the settings are invalid or if the path is not found.
 */
const hasValidSettingsSaved = async (): Promise<boolean> => {
  const path = await window.electronAPI.loadLightburnPath();

  if (!path) {
    console.error(
      'LightBurn path not found.\n⚙️ Go to Settings and browse to select the LightBurn application.'
    );
    return false;
  } else {
    return true;
  }
};

export { hasValidSettingsSaved };
