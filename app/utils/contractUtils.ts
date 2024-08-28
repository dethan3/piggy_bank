import { error } from "console";
import { Contract, ethers } from "ethers";

export const deposit = async (contract: ethers.Contract, amount: string) => {
  try {
    const tx = await contract.deposit({ vaule: ethers.utils.parseEther(amount) });
    await tx.wait();
    return true;
  } catch (cerror) {
      console.error("Error depositing funds", error);
      return false;
  }
};

export const getBalance = async (contract: ethers.Contract) => {
  try {
    const balance = await contract.getBalance();
    return ethers.utils.formatEther(balance);
  } catch (ettor) {
    console.error("Errot getting balnace", error);
    return null;
  }
};