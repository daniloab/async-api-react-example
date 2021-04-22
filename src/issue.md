Hi, I have a package into my application and for each event file, it will be placed beside it the YAML file. And, from a generate function I want to do a bundle of them and generate a final file with each one placed into one place.

### Files structure
```terminal
src
  scripts
    generateAsyncApi.ts
    asyncApiHeaderConfig.js
    asyncApiHeaderConfig.yml
  asyncapi
    AsyncApi.tsx // asyncapi react component
  modules
      userSignUp
        userSignUp.ts
        userSignUp.yaml
      userSignIn
        userSignIn.ts
        userSignIn.yaml
```

### userSignUp.yaml
```yaml
channels:
  user/signUp:
    description: Event of user signUp
    parameters:
      userId:
        $ref: '#/components/parameters/userId'
```

### userSignIn.yaml
```yaml
channels:
  user/signIn:
    description: Event of user signIn
    parameters:
      userId:
        $ref: '#/components/parameters/userId'
```

### async api header info (asyncapiHeader.yaml)
```yaml
asyncapi: '2.0.0'
id: 'id'
info:
  title: User Event API
  version: '1.0.0'
  description: User Event API Specification
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0
```

So, what I'm looking for is a way to do this by a js function to generates the `.json` and `.yaml` final file with these three pieces of yaml. Without duplicating it.

Example final file:
```yaml
asyncapi: '2.0.0'
id: 'urn:com:smartylighting:streetlights:server'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you to remotely manage the city lights.

    ### Check out its awesome features:

    * Turn a specific streetlight on/off 🌃
    * Dim a specific streetlight 😎
    * Receive real-time information about environmental lighting conditions 📈
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0
channels:
  user/signUp:
    description: Event of user signUp
    parameters:
      userId:
        $ref: '#/components/parameters/userId'
  user/signIn:
    description: Event of user signIn
    parameters:
      userId:
        $ref: '#/components/parameters/userId'
```

## What I have tried
I've been tried to use the `swagger-jsdoc` to generate this final file for me. This workflow's very similar to the workflow for our redoc apis.

But, for now, we wantna go forward with forward with AsyncAPI to make better and robust our event drive.

Here an example of the generate function that we are trying to implement to generate this: https://gist.github.com/daniloab/cf74e58e2e7bfff828d8ad20c50cb2d4

So, all of this to asking two things:

1. can we still use swagger-jsdoc to generates this?
2. If don´t, whats is the properly and right way to do this? 