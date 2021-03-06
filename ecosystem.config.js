module.exports = {
  apps: [
    {
      script: 'server/index.js',
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    development: {
      user: 'gizmo',
      host: '165.232.145.102',
      ref: 'origin/staging',
      repo: 'git@github.com:ghostrib/chat-app.git',
      path: '/var/www/chat-app/',
      ssh_options: 'IdentityFile=~/.ssh/mattbrannon',
      'pre-deploy-local': '',
      'post-deploy': 'npm run build && pm2 reload server/index.js --watch',
    },
  },
};
