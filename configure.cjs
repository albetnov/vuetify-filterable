console.log('Bootstrapping Template...')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fs = require('fs')

const packageJson = JSON.parse(fs.readFileSync('./package.json'))

function slugifyCamelCase(txt) {
  return txt.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function confirmation(input, yCb, nCb = null) {
  const loweredInput = input.toLowerCase()

  if(loweredInput === 'y') {
    yCb()
    return
  }

  if(!nCb) {
    console.log("Skipping...")
    return
  }

  nCb()
  return
}

const questions = [
  {
    q: 'Package Name(Camel Case): ',
    cb: (input) => {
      console.log('Setting Up Package Name')

      const slugifiedInput = slugifyCamelCase(input)
      packageJson.name = slugifiedInput
      packageJson.keywords[0] = slugifiedInput
      packageJson.main = packageJson.main.replace('vue-plugin-template', slugifiedInput)
      packageJson.module = packageJson.module.replace('vue-plugin-template', slugifiedInput)
      packageJson.types = packageJson.types.replace('vue-plugin-template', slugifiedInput)
      packageJson.exports['.'].import = packageJson.exports['.'].import.replace(
        'vue-plugin-template',
        slugifiedInput
      )
      packageJson.exports['.'].require = packageJson.exports['.'].require.replace(
        'vue-plugin-template',
        slugifiedInput
      )

      const vite = fs.readFileSync('./vite.config.ts', 'utf-8')
      const replacedVite = vite.replace('vue-plugin-template', slugifiedInput)
      fs.writeFileSync('./vite.config.ts', replacedVite)

      fs.renameSync('./lib/vue-plugin-template.ts', `./lib/${slugifiedInput}.ts`)
    }
  },
  {
    q: 'Package Description: ',
    cb: (input) => {
      packageJson.description = input
    }
  },
  {
    q: 'Package Repository Url: ',
    cb: (input) => {
      packageJson.repository.url = input
    }
  },
  {
    q: 'Package Author Name: ',
    cb: (input) => {
      packageJson.author.name = input
    }
  },
  {
    q: 'Package Author Email: ',
    cb: (input) => {
      packageJson.author.email = input
    }
  },
  {
    q: 'Package Author Url: ',
    cb: (input) => {
      packageJson.author.url = input
    }
  },
  {
    q: 'Configure Git Ignore? (Y/N): ',
    cb: input => confirmation(input, () => {
      const gitIgnore = fs.readFileSync('./.gitignore', 'utf-8')
      const replacedString = gitIgnore.replace("# src", "src")
      .replace("# public", "public")
      .replace("# index.html", "index.html")
      fs.writeFileSync('./.gitignore', replacedString)
      console.log("Git Ignore Comment Removed")
    })
  }
]

function askQuestion(index, resolve) {
  if (index === questions.length) {
    rl.close()
    resolve()
    return
  }

  rl.question(questions[index].q, (input) => {
    questions[index].cb(input)
    askQuestion(index + 1, resolve)
  })
}

function askPromise() {
  return new Promise((resolve) => {
    askQuestion(0, resolve)
  })
}

askPromise().then(() => {
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))
  console.log('Package.json Updated')
  console.log('Done... Initializing Self Delete...')
  fs.unlink('./configure.cjs', () => {
    console.log("Done! Don't forget to replace readme content ;)")
  })
})
