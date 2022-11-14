# Using Azure Pipelines to run CodeQL on a GitHub repo

## Use Case

This repo will show how you can host your code in GitHub and use an Azure DevOps (ADO) pipeline to run the CodeQL scans and return the results back to the GitHub interface. 

![CodeQL-AzurePipelines](https://user-images.githubusercontent.com/19208973/201486114-e0024835-2aeb-4547-beee-349a9287887f.png)

### Requirements

- GitHub Repo: public or private (needs GitHub Advanced Security enabled)
- Azure DevOps project: YML pipeline created
- GitHub PaT token: (repo & security events scope) saved as an ADO pipeline variable
- [Azure Pipelines GitHub app](https://github.com/marketplace/azure-pipelines): to allow ADO access to the GitHub repo

### Overview

This repo has a simple Node JS App which uses an [ADO pipeline](https://dev.azure.com/samhope-evans/code-scanning-ado/) run the CodeQL scan.

[![Build Status](https://dev.azure.com/samhope-evans/code-scanning-ado/_apis/build/status/futuredesignUK.code-scanning-ado?branchName=main)](https://dev.azure.com/samhope-evans/code-scanning-ado/_build/latest?definitionId=21&branchName=main)

The ADO pipeline uses the CodeQL API to:

- Download the latest CodeQL bundle for the detected OS
- Detect the languages of a given repository to determine which ones are supported by CodeQL
- Create CodeQL databases, analyze, and upload results back to GitHub for each supported language
- GitHub security tab shows the alerts as *Workflow: API upload*

![image](https://user-images.githubusercontent.com/19208973/196413583-741b41d2-6b4f-407b-ad92-9fc51505a517.png)




### Credit

Based on this [blog post by Kevin Alwell](https://github.blog/2020-10-27-code-scanning-a-github-repository-using-github-advanced-security-within-an-azure-devops-pipeline/).

The [CodeQL runner is now deprecated](https://docs.github.com/en/code-security/code-scanning/using-codeql-code-scanning-with-your-existing-ci-system/running-codeql-runner-in-your-ci-system).

So adapted the Azure pipeline using [David Wiggs's CodeQL Anywhere repo](https://github.com/david-wiggs/codeql-anywhere).


