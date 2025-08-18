module.exports = {
  default: {
   
    paths: ['features/*.feature'],
    require: [
      "src/steps/**/*.ts",
      "src/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "allure-cucumberjs/reporter"
    ],
    formatOptions: {
      resultsDir: 'allure-results',
    },
    timeout: 60000,
    parallel: 1
  }
};