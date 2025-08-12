module.exports = {
  transpileDependencies: [
    'rpc-websockets',
    '@solana/web3.js',
    '@solana/spl-token',
    '@solana/spl-token-metadata',
    '@solana/codecs',
    '@solana/codecs-core',
    '@solana/codecs-numbers',
    '@solana/codecs-data-structures',
    '@solana/errors',
    '@solana/buffer-layout-utils',
    '@solana/options',
    '@noble/curves',
    '@noble/hashes',
    '@noble/secp256k1',
    '@noble/ed25519'
  ],
  chainWebpack: config => {
    // Handle .cjs files properly
    config.module
      .rule('cjs')
      .test(/\.cjs$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
    
    // Handle .mjs files
    config.module
      .rule('mjs')
      .test(/\.mjs$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
  }
} 