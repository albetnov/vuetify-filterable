# Vue Plugin Template

This template is tailored to simplify the process of creating plugins for Vue.js, complete with TypeScript integration, Eslint and Prettier for consistent code quality, and Vitest configuration for seamless testing.

# Configuring

You can configure the project to change its name and contents using the CLI:

```bash
node ./configure.cjs
```

Follow the instructions, and everything should be set.

# Directory Structure

- `__tests__` <br/> all your test files should placed here
- `lib` <br /> Your plugin source code to be bundled
- `src` <br /> Basically, your playground

## Removing unnecessary folders or file from git

For instance, consider the src directory, which should be excluded from Git. To do this, ensure the deletion of the src folder in the remote repository, followed by the clearing of your local Git cache. Consequently, any additions or removals within the src folder will not activate Git actions.

Here are step-by-step instructions you can follow:

- Uncomment the src line in the .gitignore file.
- Execute: git rm -r --cached src
- Commit the changes and push to the remote branch.

The same approach can be applied to other files that aren't typically committed to remote repositories, like public and index.html. If these files are already listed in your .gitignore, simply uncomment the relevant lines.