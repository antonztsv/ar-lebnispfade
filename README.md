# ARlebnispfade OBK

Nutzt [11ty](https://www.11ty.dev) für die strukturierte Ablage von Content.

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

## ToDos

### Michael
- Einführungstext Startseite
- Link zum Projekt Startseite
- Einführungstext zu den Pfaden
- Absprungtext Text bei den POIs
- Duzen oder siezen?