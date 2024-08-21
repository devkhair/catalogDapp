const hre = require("hardhat");

async function main() {

  const bookCatalog = await hre.ethers.deployContract("BookCatalog", ["Rich Dad Poor Dad", 1997]);

  await bookCatalog.waitForDeployment();

  console.log(`Deployed to ${bookCatalog.target}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
