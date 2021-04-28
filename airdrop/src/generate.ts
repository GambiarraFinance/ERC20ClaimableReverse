import fs from 'fs'
import { soliditySha3 } from 'web3-utils'
import { MerkleTree } from './merkleTree'
import { buf2hex, hex2buf } from './helpers'
import { ethers } from 'ethers'
const abiCoder = new ethers.utils.AbiCoder()

export function generate(accounts: string[]): string {
  const rawLeaves = accounts.map((address) => ({ address, amount: Math.floor(Math.random() * 100000) }))
  const leaves = rawLeaves.map((v, i) => {
    return {
      index: String(i),
      buf: Buffer.concat([
        hex2buf(abiCoder.encode(['uint256'], [i])),
        hex2buf(v.address),
        hex2buf(abiCoder.encode(['uint256'], [v.amount])),
      ]),
      ...v,
    }
  })

  const tree = new MerkleTree(
    leaves.map((l) => buf2hex(l.buf)),
    (soliditySha3 as unknown) as (...str: string[]) => string,
  )

  const offset = leaves.length - 146
  const leavesWithProof = leaves.slice(offset, offset + 10).map((l) => {
    return {
      address: l.address,
      proof: tree.generateProof(buf2hex(l.buf)),
      amount: l.amount,
      index: l.index,
    }
  })
  const merkleRoot = tree.root

  return 'module.exports = ' + JSON.stringify({ merkleRoot, leavesWithProof }, null, 2)
}

export function generateReal(accounts: { address: string; amount: number }[]): string {
  const leaves = accounts
    .map((v, i) => {
      return {
        index: String(i),
        buf: Buffer.concat([
          hex2buf(abiCoder.encode(['uint256'], [i])),
          hex2buf(v.address),
          hex2buf(abiCoder.encode(['uint256'], [Number(v.amount.toFixed(0))])),
        ]),
        ...v,
      }
    })
    .slice(0, 100)

  const tree = new MerkleTree(
    leaves.map((l) => buf2hex(l.buf)),
    (soliditySha3 as unknown) as (...str: string[]) => string,
  )

  const leavesWithProof = leaves.map((l) => {
    return {
      address: l.address,
      proof: tree.generateProof(buf2hex(l.buf)),
      amount: Number(l.amount.toFixed(0)),
      index: l.index,
    }
  })

  const merkleRoot = tree.root

  if (process.env.REAL === 'true') {
    fs.writeFile('data/proofs.json', JSON.stringify({ merkleRoot, leaves: leavesWithProof }, null, 2), () => {})
  }

  return 'module.exports = ' + JSON.stringify({ merkleRoot, leavesWithProof }, null, 2)
}
