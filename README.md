# Renovate Bot for UYR-DOCTORS 🤖

Automated dependency updates for the UYR-DOCTORS organization using self-hosted Renovate Bot.

## 🚀 Quick Start

This repository runs Renovate Bot on a schedule to automatically:
- Check for dependency updates in your repositories
- Create Pull Requests with updated dependencies
- Group related updates for easier review
- Alert you to security vulnerabilities

## 📋 Prerequisites

Before setting up, you need to create a GitHub App for authentication.

## 🔧 Setup Instructions

### Step 1: Create GitHub App

1. Go to your organization settings:
   ```
   https://github.com/organizations/UYR-DOCTORS/settings/apps/new
   ```

2. Fill in the App details:
   - **GitHub App name**: `UYR-DOCTORS Renovate Bot`
   - **Homepage URL**: `https://github.com/UYR-DOCTORS/renovate-bot`
   - **Webhook**: Disable (uncheck "Active")

3. Set the following **Repository permissions**:
   | Permission | Access |
   |------------|--------|
   | Checks | Read + Write |
   | Commit statuses | Read + Write |
   | Contents | Read + Write |
   | Dependabot alerts | Read |
   | Issues | Read + Write |
   | Pull requests | Read + Write |
   | Workflows | Read + Write |
   | Administration | Read |
   | Members | Read |
   | Organization Private Registries | Read (for private packages) |

4. Click **Create GitHub App**

### Step 2: Generate and Store Credentials

1. On the app's page, note the **App ID** at the top
2. Scroll down and click **Generate a private key**
3. Save the downloaded `.pem` file - you'll need its contents

### Step 3: Install the App

1. On the app's page, click **Install App** in the left sidebar
2. Select **UYR-DOCTORS** organization
3. Choose:
   - **All repositories** (recommended), or
   - **Only select repositories** (choose which repos Renovate should manage)
4. Click **Install**

### Step 4: Configure GitHub Secrets

Add the following secrets to this repository:

1. Go to: `https://github.com/UYR-DOCTORS/renovate-bot/settings/secrets/actions`

2. Add these secrets:
   - **`RENOVATE_APP_ID`**: The App ID from Step 2
   - **`RENOVATE_PRIVATE_KEY`**: The entire contents of the `.pem` file including:
     ```
     -----BEGIN RSA PRIVATE KEY-----
     ...
     -----END RSA PRIVATE KEY-----
     ```

### Step 5: Configure Repositories

Edit `renovate-config.js` and add your repositories:

```javascript
repositories: [
  'UYR-DOCTORS/UYR-WEB-INFRA',
  'UYR-DOCTORS/another-repo',
  'UYR-DOCTORS/yet-another-repo',
],
```

### Step 6: Test the Setup

1. Go to the **Actions** tab
2. Select the **Renovate Bot** workflow
3. Click **Run workflow**
4. Set:
   - **Log level**: `debug`
   - **Dry run**: `true`
5. Click **Run workflow**
6. Check the logs for any errors

### Step 7: Enable Production Mode

Once the dry run succeeds:
1. Run the workflow again with **Dry run**: `false`
2. Renovate will now create actual Pull Requests!

## 📅 Schedule

Renovate runs automatically:
- **Every 6 hours** via GitHub Actions cron
- **Outside business hours** as configured in `renovate-config.js`
- **Manually** via the Actions tab

## 🔒 Security

- Uses GitHub App authentication (more secure than PATs)
- Private key stored in GitHub Secrets
- Only has access to repositories where the app is installed
- Creates PRs that require review before merging

## ⚙️ Configuration

### Main Configuration File: `renovate-config.js`

Key settings you can customize:

```javascript
// Limit concurrent PRs
prConcurrentLimit: 5,

// Group updates by type
packageRules: [
  {
    matchDatasources: ['terraform-provider'],
    groupName: 'Terraform providers',
  },
],

// Schedule when to run
schedule: [
  'after 10pm every weekday',
  'before 5am every weekday',
  'every weekend',
],

// Auto-merge (disabled by default for safety)
automerge: false,
```

### Workflow File: `.github/workflows/renovate.yml`

- Runs on schedule (every 6 hours)
- Can be triggered manually with options
- Supports debug mode for troubleshooting

## 🐛 Troubleshooting

### Enable Debug Logging

1. Go to Actions → Renovate Bot → Run workflow
2. Set **Log level** to `debug`
3. Enable **Dry run** to avoid creating PRs
4. Check the detailed logs

### Common Issues

**No PRs are being created:**
- Check that the GitHub App is installed on the target repositories
- Verify the `repositories` list in `renovate-config.js`
- Check workflow logs for errors
- Ensure secrets are correctly set

**Permission errors:**
- Verify all required permissions are set on the GitHub App
- Re-install the app if permissions were added after installation

**Private package authentication fails:**
- Ensure `Organization Private Registries` permission is enabled
- Check `hostRules` configuration in `renovate-config.js`

## 📚 Documentation

- [Renovate Documentation](https://docs.renovatebot.com/)
- [GitHub App Setup](https://docs.renovatebot.com/modules/platform/github/#running-as-a-github-app)
- [Configuration Options](https://docs.renovatebot.com/configuration-options/)
- [Package Rules](https://docs.renovatebot.com/configuration-options/#packagerules)

## 🤝 Contributing

To add more repositories:
1. Install the GitHub App on the new repository
2. Add the repository to the `repositories` array in `renovate-config.js`
3. Commit and push the changes
4. Renovate will include it in the next run

## 📝 License

This configuration is maintained by the UYR-DOCTORS DevOps team.

## 🆘 Support

For issues or questions:
- Open an issue in this repository
- Contact the DevOps team
- Check the [Renovate documentation](https://docs.renovatebot.com/)

---

**Happy automating! 🚀**
