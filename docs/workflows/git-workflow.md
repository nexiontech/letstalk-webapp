# Git Workflow

## Overview

This document outlines the Git branching strategy and workflow used in the LetsTalk project. We follow a GitHub Flow approach with short-lived feature branches and a central integration branch called `changes`.

## Branch Structure

### Main Branches

- **`main`**: Production-ready code that has been deployed
- **`changes`**: Integration branch for features and fixes before they are merged to `main`

### Feature Branches

Feature branches are created from the `changes` branch and follow a specific naming convention:

```
<type>/<ticket-number>-<description>
```

Where:
- `<type>` is one of:
  - `feature/`: New features
  - `fix/`: Bug fixes
  - `refactor/`: Code refactoring without changing functionality
  - `docs/`: Documentation changes
  - `test/`: Adding or modifying tests
  - `chore/`: Maintenance tasks, dependency updates, etc.
- `<ticket-number>` is the JIRA ticket number (e.g., LT-123)
- `<description>` is a brief, kebab-case description of the change

Examples:
- `feature/LT-200-user-profile`
- `fix/LT-100-general-app-improvements`
- `docs/LT-150-api-documentation`

## Workflow

### 1. Create a Feature Branch

Start by creating a new branch from the `changes` branch:

```bash
# Ensure you're on the changes branch
git checkout changes

# Pull the latest changes
git pull

# Create a new feature branch
git checkout -b feature/LT-123-new-feature
```

### 2. Develop and Test

Develop the feature or fix in isolation, making regular commits:

```bash
# Make changes to files
...

# Stage changes
git add <files>

# Commit changes with a descriptive message
git commit -m "feature: implement new functionality

- Add component X
- Update service Y
- Fix issue Z"
```

Commit messages should follow this format:
- First line: Brief summary of the change (type: description)
- Blank line
- Bullet points with details of the changes

### 3. Push to Remote

Push your branch to the remote repository:

```bash
git push origin feature/LT-123-new-feature
```

### 4. Merge to Changes Branch

Once the feature is complete and tested, merge it back to the `changes` branch:

```bash
# Switch to the changes branch
git checkout changes

# Pull the latest changes
git pull

# Merge the feature branch
git merge feature/LT-123-new-feature

# Push the updated changes branch
git push origin changes
```

### 5. Clean Up

After the feature branch has been merged, delete it:

```bash
# Delete the local branch
git branch -d feature/LT-123-new-feature

# Delete the remote branch
git push origin --delete feature/LT-123-new-feature
```

## Example Workflow

Here's an example of the complete workflow for implementing a new feature:

```bash
# Start from the changes branch
git checkout changes
git pull

# Create a feature branch
git checkout -b feature/LT-200-user-profile

# Develop the feature
# ... make changes, commits, etc.

# Push the feature branch to remote
git push origin feature/LT-200-user-profile

# When feature is complete, merge back to changes
git checkout changes
git pull
git merge feature/LT-200-user-profile
git push origin changes

# Clean up
git branch -d feature/LT-200-user-profile
git push origin --delete feature/LT-200-user-profile
```

## Handling Conflicts

If there are conflicts when merging a feature branch back to `changes`:

```bash
# During the merge, conflicts will be reported
git merge feature/LT-123-new-feature

# Resolve conflicts in each file
# ... edit files to resolve conflicts

# Stage resolved files
git add <resolved-files>

# Complete the merge
git commit

# Push the updated changes branch
git push origin changes
```

## Pull Requests (Optional)

For larger features or when code review is required, create a pull request instead of directly merging:

1. Push your feature branch to the remote repository
2. Create a pull request from your feature branch to the `changes` branch
3. Request reviews from team members
4. Address any feedback and make necessary changes
5. Merge the pull request when approved
6. Delete the feature branch

## Best Practices

1. **Keep branches short-lived**: Feature branches should be merged back to `changes` as soon as possible
2. **Pull regularly**: Keep your local `changes` branch up to date by pulling regularly
3. **Commit often**: Make small, focused commits with clear messages
4. **Test before merging**: Ensure all tests pass before merging to `changes`
5. **Resolve conflicts promptly**: Address merge conflicts as soon as they arise
6. **Use descriptive branch names**: Follow the naming convention to make it clear what each branch is for
7. **Clean up old branches**: Delete branches after they've been merged

## Git Configuration

Recommended Git configuration for the project:

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch to changes
git config --global init.defaultBranch changes

# Set up git aliases for common commands
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```
