module.exports = {
  apps: [
    {
      name: 'Aavin-PG-Handler',
      script: 'npm',
      args: 'start',
      cwd: '/home/ec2-user/var/www/uat/TestNextProject',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
                PORT: 3003
      },
      env_production: {
        NODE_ENV: 'production',
                PORT: 3003

      },
    },
  ],
};