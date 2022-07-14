const fs = require('fs');
const data = require('../src/data/data.json');

let presumedModules = new Array;
let templatedModules = new Array;
let modules = new Array;

let modulePath = "./src/modules/templated";

const getModulesFromData = async(obj) => {
  const entries = Object.entries(obj);
  const isObject = (val) => typeof val === "object" && !Array.isArray(val);

  for (var i = 0; i < entries.length; i++) {
    let [key, entry] = entries[i];

    // if entry is object or array, recursively get module names from them
    if (Array.isArray(entry)) {
      for (var j = 0; j < entry.length; j++) {
        await getModulesFromData(entry[j]);
      }
    } else if (isObject(entry)) {
      await getModulesFromData(entry);
    // if we have a type, resume it's a module and add to presumedModules
    } else if (key == 'type') {
      presumedModules.push(entry);
    }
  }
}

const setPresumedModulesFromData = async() => {
  await getModulesFromData(data);

  presumedModules = presumedModules.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);

  // timeline module can have ads hidden within
  if (presumedModules.includes('timeline') && !presumedModules.includes('ad')) {
    presumedModules.push('ad');
  }
}

const setTemplatedModules = async() => {
  fs.readdirSync(`${modulePath}/`).filter(function (file) {
    if (fs.statSync(`${modulePath}/${file}`).isDirectory()) {
      templatedModules.push(file);
    }
  });
}

const setModules = async() => {
  templatedModules.forEach(module => {
    if (presumedModules.includes(module.toLowerCase())) {
      modules.push(module);
    }
  });
}

const generateSassPartial = async() => {
  let sass = '// This is a automatically generated partial. Do not edit.\n';

  modules.forEach(module => {
    if (fs.existsSync(`${modulePath}/${module}/index.scss`)) {
      sass = sass + `@import "./${module}/index.scss"; \n`;

      console.log('Importing CSS for', module);
    }
  });

  fs.writeFileSync(`${modulePath}/index.scss`, sass);
}

const generateJavascriptPartial = async() => {
  let imports = '// This is a automatically generated partial. Do not edit.\n';
  let inits = '';

  modules.forEach(module => {
    if (fs.existsSync(`${modulePath}/${module}/client.tsx`)) {
      const moduleName = module[0].toLowerCase() + module.slice(1);
      imports = imports + `import ${moduleName} from './${module}/client'; \n`;
      inits = inits + `  ${moduleName}.init() \n`;

      console.log('Importing JS for', module);
    }
  });

  const js = imports + '\nexport default { init: () => { \n' + inits + '}};';

  fs.writeFileSync(`${modulePath}/client.tsx`, js);
}

const pruneComponents = async( path ) => {
  presumedModules = new Array;
  templatedModules = new Array;
  modules = new Array;
  modulePath = path;

  await setPresumedModulesFromData();
  await setTemplatedModules();
  await setModules();

  await generateSassPartial();
  await generateJavascriptPartial();
}

(async () => {
  console.log('Pruning templated modules');
  await pruneComponents("./src/modules/templated");

  console.log('Pruning custom modules');
  await pruneComponents("./src/modules/custom");

  console.log('Finished pruning');
})();
