const fs = require('fs')
const chalk = require('chalk')

//List All Notes
const getNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse('Your notes...'))
    notes.map((note) => console.log(note.title))
}

//Create New Note
const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title === title )

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }else{
        console.log(chalk.red.inverse("Note title taken!"))
    }
    
    
}

//Save Note
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

//Load All Notes
const loadNotes = () => {
    try{
        //If file exist
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        //if file doesn't exist
        return []
    }
}

//Remove Note
const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title )

    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note Removed!"))
    }else{
        console.log(chalk.red.inverse("No notes removed!"))
    }
}

//Filer/Read Note
const readFilterNote = function(title){
    const notes = loadNotes()
    const filteredNote = notes.find((note) => note.title.toUpperCase() === title.toUpperCase())
    if(filteredNote){
        console.log(chalk.magenta.inverse("Title: " + filteredNote.title + ", Body: " + filteredNote.body ))
    }else{
        console.log(chalk.red.inverse("No note found!"))
    }
}

//exporting functions
module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote,
    filterNote : readFilterNote
}