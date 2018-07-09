#!/usr/bin/env node

const fs = require('fs')
const shell = require('shelljs')
const prompt = require('prompt')
const program = require('commander')

class Otto {
  constructor() {
    this.config = {}
  }

  create(options) {
    let config
    if(options.config) {
      config = JSON.parse(fs.readFileSync(options.config))
    }
    else {
      config = this.config
    }

    // Interview the user (using prompt), gathering, project info

    //
    // Start the prompt
    //
    prompt.start()

    //
    // Get project name
    //
    prompt.get(['path','username'], (err, result) => {
      let path = result.path
      console.log(`path: ${path}`)
      let username = result.username
      console.log(`username: ${username}`)

      if(!fs.existsSync(path)) {
        shell.mkdir('-p', path)
      }
      else {
        console.log(`${path} already exists`)
      }
    })
    
  } 
}



let otto = new Otto()

program
  .command('create')
  .option('--config <config>', 'Config for projects')
  .action((options) => {
    otto.create(options)
  })

program.parse(process.argv)

if(!program.args.length) program.help()
