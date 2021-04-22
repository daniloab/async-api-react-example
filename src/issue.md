Hi, I have a package into my application and for each event file, it will be placed beside it the YAML file. And, from a generate function I want to do a bundle of them and generate a final file with each one placed into one place.

### Files structure
```terminal
src
  scripts
    generateAsyncApi.ts
    asyncApiHeaderConfig.js
    asyncApiHeaderConfig.yml
  asyncapi
    AsyncApi.tsx // asyncapi react component that consume 
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
  user/signedup:
    subscribe:
      message:
        $ref: '#/components/messages/UserSignedUp'
components:
  messages:
    UserSignedUp:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
```

### userSignIn.yaml
```yaml
channels:
  user/signedin:
    subscribe:
      message:
        $ref: '#/components/messages/UserSignedIn'
components:
  messages:
    UserSignedIn:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user

```

### async api header info config (asyncapiHeader.yaml)
```yaml
asyncapi: '2.0.0'
id: 'id'
info:
  title: User Event API
  version: '1.0.0'
  description: User Event API Specification
```

So, what I'm looking for is a way to do this by a js function to generates the `.json` and `.yaml` final file with these three pieces of yaml. Without duplicating it.

Example final file:
```yaml
asyncapi: '2.0.0'
id: 'id'
info:
  title: User Event API
  version: '1.0.0'
  description: User Event API Specification
channels:
  user/signedup:
    subscribe:
      message:
        $ref: '#/components/messages/UserSignedUp'
  user/signedin:
    subscribe:
      message:
        $ref: '#/components/messages/UserSignedIn'
components:
  messages:
    UserSignedUp:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
    UserSignedIn:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
```

## What I have tried
I've been tried to use the `swagger-jsdoc` to generate this final file for me. This workflow's very similar to the workflow for our redoc apis.

The final result being generated is an error: `TypeError: Cannot read property 'messages' of undefined`

So, I think that the swagger-jsdoc does not support this schema of channels.

### How can I do this?
But, for now, we want to go forward with AsyncAPI to make better and robust our event drive.

Here an example of the generate function that we are trying to implement to generate this: https://gist.github.com/daniloab/cf74e58e2e7bfff828d8ad20c50cb2d4

So, all of this to asking two things:

1. can we still use swagger-jsdoc to generates this?
2. If don´t, whats is the properly and right way to do this? 