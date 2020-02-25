# Bug-Report

Welcome to the Bug-Report!

You have been tasked with creating a tool to better report bugs for your team. The goal being, to better track bugs in your application, as well as the process taken to solve them.

All bugs will have a title, description, who reported the bug, closedDate and whether or not it has been closed. 

Users can also add notes to the bug report providing detailed steps towards the bugs resolution.

Once a bug has been closed, no further editing is allowed.


## Bug-Report API


### Bug Schema
```Javascript
var bug = new Schema({
    closed: Boolean
    description: String,
    title: String,
    reportedBy: String, //The provided name for who reported the bug
    closedDate: Date
}, { timestamps: true, toJSON: { virtuals: true } })
```

### Note Schema
```Javascript
var note = new Schema({
    content: String,
    bug: ObjectId,
    reportedBy: String, //The provided name for who made the note
}, { timestamps: true, toJSON: { virtuals: true } })
```


### Endpoints
> baseUrl: `'https://localhost:3000/api'`

Get

`/bugs`: returns a list of all the bugs

`/bugs/:id`: returns a single bug with all it's data

`/bugs/:id/notes`: returns all notes for a given bug id

Post

`/bugs`: Creates a new bug

`/notes`: Adds a new note to the bug.

Put 

>*both of these can only be done if bug is open*

`/bugs/:id`: Edits bug

`/bugs/:id/notes/:id`: Edits note. (not required)

Delete

> There is no true bug delete, only changing the status of a bug to closed.

`/bugs/:id`: Changes status of bug from open to close

`/bugs/:id/notes/:id`: Deletes note.


<hr>


## Requirements

### Functionality
- Bugs have last modified date
- Bugs can be created
- Bugs can be closed
- Bugs are closed, not deleted
- Notes can be created
- Notes can be removed from a bug
- A Bug can be edited
- Cannot edit a Bug after it is closed
- All tests pass

# TESTING:
 go to http://localhost:3000/#/test-runner to use a testing suite for your server.
