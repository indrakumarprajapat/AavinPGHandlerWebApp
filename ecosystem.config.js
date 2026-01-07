module.exports = {
  apps: [
    {
      name: "Aavin-PG-Handler",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3003",
      cwd: "/home/ec2-user/var/www/uat/AavinPGHandlerWebApp",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
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