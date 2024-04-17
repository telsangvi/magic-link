# Magic Link Framework

### [Medium blog](https://medium.com/@vishwa.telsang/magic-link-framework-in-nodejs-b758b2f5425a) 

## Overview

The Magic Link Framework is a Node.js library designed to simplify user authentication by leveraging magic links. This framework provides functionalities for generating, validating magic links or tokens, and managing user sessions.

## Directory Structure

```plaintext
magicLinkFramework/
│
├── magicLink/
│   ├── Generate.ts
│   └── Validate.ts
│
├── middleware/
│   └── auth.ts
│
└── services/
    ├── userService.ts
    └── authService.ts
```

### Folders Description

- **magicLink**: Responsible for generating and validating the magic link or token.
- **middleware**: Contains middleware for token validation when protected routes are accessed.
- **services**: Simulates user and auth services to provide user details and generate actual authentication JWT tokens.

## Features

- **Simplified Authentication**: Streamlines the authentication process by using magic links.
- **Enhanced Security**: Reduces the attack surface associated with passwords.
- **Flexible Implementation**: Adaptable to various product requirements with customizable token validation strategies.

## Getting Started

### Installation
```
npm install
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
