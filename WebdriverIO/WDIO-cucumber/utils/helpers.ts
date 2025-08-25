const { supportCodeLibraryBuilder } = require('@cucumber/cucumber');

export async function combineSteps({ steps }: { steps: string[] }) {

  const findStep = ({ name }: { name: string }) => {
    let captureGroups: string[] | undefined;

    const nameWithoutStepType = name.replace(/(Given|When|Then|And) /, '');    

    const step = supportCodeLibraryBuilder.stepDefinitionConfigs.find(({ pattern }: { pattern: string }) => {
      const regex = new RegExp(pattern);
      if (regex.test(nameWithoutStepType)) {
        // get the match group and remove the element[0] (whole match)
        const matches = nameWithoutStepType.match(regex) || [];
        captureGroups = [...matches];
        captureGroups.shift();

        // if the captureGroup is 0 -- (i.e. there are no capture groups -- this must be an exact match)
        if (captureGroups.length === 0) {
          if (pattern === nameWithoutStepType) {
            return true;
          }
          return false;
        }

        return true;
      }
      return false;
    });

    return {
      step,
      captureGroups,
    } as { step: any, captureGroups: string[] | undefined };
  };

  for (const stepName of steps) {
    try {
      const { step, captureGroups } = findStep({ name: stepName });
      await step.code(...(captureGroups ?? []));
    } catch (err) {
      console.error(`Error in combineSteps with name: ${stepName}`);
      throw err;
    }
  }
}