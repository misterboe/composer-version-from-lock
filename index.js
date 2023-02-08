#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Definiere den Pfad zur aktuellen Arbeitsverzeichnis
const cwd = process.cwd();

// Definiere den vollständigen Pfad zur composer.lock Datei
const lockFilePath = path.resolve(cwd, 'composer.lock');

// Lese die composer.lock Datei ein
const lockFile = fs.readFileSync(lockFilePath, 'utf-8');

// Parsed die JSON Daten aus der composer.lock Datei
const lockData = JSON.parse(lockFile);

// Extrahiere die verwendeten Versionen aus den Abhängigkeiten
const dependencies = lockData.packages.map(dependency => {
  return {
    name: dependency.name,
    version: dependency.version,
  };
});

// Definiere den vollständigen Pfad zur composer.json Datei
const jsonFilePath = path.resolve(cwd, 'composer.json');

// Lese die composer.json Datei ein
const jsonFile = fs.readFileSync(jsonFilePath, 'utf-8');

// Parsed die JSON Daten aus der composer.json Datei
const jsonData = JSON.parse(jsonFile);

// Gehe durch jede Abhängigkeit und aktualisiere nur die Version, wenn das Paket bereits in der composer.json definiert ist
dependencies.forEach(dependency => {
  if (jsonData.require[dependency.name]) {
    jsonData.require[dependency.name] = dependency.version;
  }
});

// Schreibe die aktualisierten Daten zurück in die composer.json Datei
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
