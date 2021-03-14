# Swamp Language Extension

## Contribute

### Contribute a theme

* Clone this repo.
* Go to the directory where you cloned it.
* Open Visual Studio Code in that directory, e.g. `code .`
* Copy an existing theme, e.g. [themes/swamp-dark-color-theme.json](themes/swamp-dark-color-theme.json).
* Add the new theme to the [package.json](package.json):
```json
		"themes": [
			{
				"label": "Swamp Your Theme Name",
				"uiTheme": "vs-dark",
				"path": "./themes/swamp-dark-my-theme-name.json"
			}
		]
```
* Select `run/run without debugging` from the menu. (usually mapped to `Ctrl+F5`).
* Running will open a separate editor window with the plugin running.
* Change the colors in your theme file and press save and the colors should be changed instantly.
