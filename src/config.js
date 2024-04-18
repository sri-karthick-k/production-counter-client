const config = {
    server: {
      port: 4001,
      hostname: 'http://localhost'
    },
    apiKeys: {
      login: '/api/login',
      authenticate: '/api/authenticate',
      addTenantUser: '/api/add-tenant-user',
      addDevice: '/api/add-device',
      getDevices: '/api/get-devices',
      getMax: '/api/device-max',
      getSensorValue: '/api/get-sensor-value',
      getCurrentDaySensorValue: '/api/current-day-sensor-value',
      getDevReport: '/api/device-report',
      deviceName:'/api/device-name',
      deviceManager: '/api/device-manager'
    }
  };


module.exports = config;
