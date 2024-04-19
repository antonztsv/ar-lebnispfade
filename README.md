# ARlebnispfade OBK

Nutzt [11ty](https://www.11ty.dev) für die strukturierte Ablage von Content. Für die Karte wird eine .env Konfiguration mit dem Token genutzt.


## Ordnerstruktur

### `/docs`
kompilierter Code


### `/src` hier wird entwickelt

```
_layouts            Templates
assets              SCSS, Skripts, Fonts, etc … alles was kein Content ist
compiled-assets     Kompilierte Dateien, z.B. CSS
```

### Weitere Dateien
```
.eleventy.js        Config von 11ty
.eleventyignore     Welche Folder/ Files soll 11ty ignorieren?
.eslintrc.json      
.gitignore          
.stylelintrc.json   
```

## Funktionen

- `npm install`
- `npm run build` 
- `npm run dev` 
- `npm run quiet` Leise Version des Dev Servers … ist nicht so gesprächig 🤫


## Code Conventions

- bitte Material Icons nutzen
- in Dateinamen bitte keine CamelCase Notation verwenden

### CSS
- bitte (möglichst) ausschließlich CSS Variabeln aus der variables.scss nutzen
- bitte keine Regeln auf Elemente im Global Scope legen. Außer in der base.scss



## Deployments

Wir haben drei Umgebungen mit folgenden Aufgaben:

| Ungebung | Branch | Url | Aufgabe |
|---|---|---|---|
| Produktiv | main | https://arlebnisobk.de | Produktivumgebung für die Welt | 
| Dev | dev | https://dev.arlebnisobk.de | Umgebung um Entwicklungsstände auszutesten |
| Preview | preview | https://preview.arlebnisobk.de |Umgebung zur temprären Bereitstellung von Entwicklungsständen, z.B. für Absprachen oder Demos. Bitte in der Preview.md dokumentieren, damit keine Stände überschrieben werden, die gerade noch gebraucht werden. |

Ein Commit auf den jeweiligen Branch triggert ein Deploment auf die entsprechende Umgebung.

## Probleme

IOS byte-range-requests siehe Issue [#33](https://github.com/ARlebnispfade-Oberbergischer-Kreis/ar-lebnispfade/issues/33)
