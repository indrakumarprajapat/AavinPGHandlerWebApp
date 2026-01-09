module.exports = {
  apps: [
    {
      name: 'Aavin-PG-Handler',
      // Path to the next binary inside your node_modules
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3003',
      cwd: '/var/www/prod/AavinPGHandlerWebApp',
      instances: 1,
      exec_mode: 'fork', // Use 'cluster' only if you have multiple instances
      autorestart: true,
      watch: false,      // TURN THIS OFF for production
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};