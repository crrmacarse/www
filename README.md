# Personal API Server

Using NestJS as framework.

### Installation

```bash
$ npm install
```

## Development

```bash
# start development
$ npm run start:dev

# Or utilize hot reloading. This will result for faster develoopment build time(recommended)
$ npm run start:hot
```

It is highly recommended to run testing on background

```bash
# run testing on background
$ npm run test:watch
```

## Production

```bash
# build production files
$ npm run build

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Known Issues

- Becareful of importing `module.ts` instead of `http-module.ts` in resolving module dependency. You should be using the `http` version. There will be no errors for it, Only showing "running" but the server doesn't start.

## Resources

- https://nestjs.com/
- https://github.com/nestjs/nest

## Get in touch

<p>
<a href="https://twitter.com/crrmacarse">
<img src="https://img.shields.io/badge/crrmacarse%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/>
</a>
<a href="https://www.linkedin.com/in/christian-ryan-r-macarse-692974166/">
<img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="https://stackoverflow.com/users/10030210/crrmacarse?tab=profile">
<img src="https://cdn.sstatic.net/Sites/stackoverflow/company/Img/logos/so/so-logo.svg?v=a010291124bf" width="110px" />
</a>
</p>