module.exports = {
  apps: [
    {
      name: "Aavin-PG-Handler",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3003",
      cwd: "/home/ec2-user/var/www/uat/AavinPGHandlerWebApp",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
