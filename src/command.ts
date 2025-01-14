import { Command } from 'commander'
import { cyan, red } from 'colorette'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'

const program = new Command()

export default (() => {
  updateNotifier({ pkg }).notify()
  program.name('musicn or msc').usage('<text>').version(pkg.version)
  program.on('--help', () => {
    console.log('')
    console.log(cyan('普通下载:'))
    console.log(`${cyan('$ ')}msc 稻香`)
    console.log(cyan('网易云服务下载:'))
    console.log(`${cyan('$ ')}msc 稻香 -s netease`)
    console.log(cyan('附带歌词:'))
    console.log(`${cyan('$ ')}msc 稻香 -l`)
    console.log(cyan('下载路径:'))
    console.log(`${cyan('$ ')}msc 稻香 -p ./music`)
    console.log('')
  })

  program
    .option('-l, --lyric', 'Download lyrics or not')
    .option('-p, --path <path>', 'Target directory path to music bulkDownload')
    .option('-s, --service <service>', 'supported music service: migu, netease', 'migu')

  const supportedServices = ['migu', 'netease']
  program.parse(process.argv)

  const options = program.opts()

  if (!supportedServices.includes(options.service)) {
    console.error(red(`不支持 ${options.service} 服务`))
    process.exit(1)
  }
  return { text: program.args.join(' '), options, serviceName: options.service }
})()
