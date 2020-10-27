const fs = require("fs/promises");
const { default: axios } = require("axios");
const { execSync } = require("child_process");

(async function () {
    console.time("Published"); 
    const v = await getVersion();
    await updatePackageJson(v);
    build();
    publish();
    commitChanges(v);
    console.timeEnd("Published");
})();


async function getVersion() {
    console.log("Fetching release version...");
    const { data } = await axios.get("https://api.github.com/repos/Cool-Bot-List/Cool-Bot-List-API/releases");

    console.log(`Fetched data: ${JSON.stringify(data, null, 2)}`);
    return data[data.length - 1].tag_name.split("v")[1];
}

async function updatePackageJson(version) {

    const packagePath = "../../javascript-typescript-wrapper/package.json";
    const packageJson = JSON.parse((await fs.readFile(packagePath)).toString());
    console.log(`Read package.json: ${JSON.stringify(packageJson, null, 2)}`);
    packageJson.version = version;
    await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2));
    console.log(`Updated package.json: ${JSON.stringify(packageJson, null, 2)}`);

    const packageLockPath = "../../javascript-typescript-wrapper/package-lock.json";
    const packageLockJson = JSON.parse((await fs.readFile(packageLockPath)).toString());
    console.log(`Read package-lock.json.`);
    packageLockJson.version = version;
    await fs.writeFile(packageLockPath, JSON.stringify(packageLockJson, null, 2));
    console.log(`Updated package-lock.json.)}`);
}

function build() {
    console.log("Building...");
    console.log(execSync("cd ../../javascript-typescript-wrapper && npm run build").toString());
}
function publish() {
    console.log("Publishing...");
    console.log(execSync("cd ../../javascript-typescript-wrapper && npm publish").toString());
}

function commitChanges(version) {
    console.log("Committing package.json + package-lock.json.");
    console.log(execSync("git add .").toString());
    console.log(execSync(`git commit -m "Updated version to ${version}"`).toString());
    console.log(execSync("git push").toString());
}


