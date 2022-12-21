# vite-plugin-xq-multi-input

A vite auto config multi html input plugin.

一个Vite自动配置多个Html入口的插件。
主用适用于Bootstrap等传统的网页开发，使得传统网页开发也可以使用vite进行开发，也省去配置多个HTML入口的麻烦。

## 安装
```bash

npm i -D vite-plugin-xq-multi-input

```
## 使用
Add plugin to your `vite.config.ts`:
在vite.config.ts引入插件：

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import xqMultiInput from 'vite-plugin-xq-multi-input';
export default defineConfig({
  plugins: [
    xqMultiInput()
  ],
}
```

## 工作原理

配置示例：

```ts
import { defineConfig } from 'vite'
import { resolve } from 'path'
import xqMultiInput from 'vite-plugin-xq-multi-input'
export default defineConfig({
    plugins:[
        xqMultiInput()
    ],
    build: {
        rollupOptions: {
            input: {
                pc: resolve(__dirname, 'pc/index.html'),
                mobile: resolve(__dirname, 'mobile/index.html')
            }
        }
    }
    
})
```

该配置有两个入口pc和mobile，插件将自动读取pc和mobile入口的目录，读取目录下其他的html文件并自动添加到input配置中，以完成自动配置其他HTML入口。

插件执行后会自动修改配置，然后再进行编译。
```ts
build: {
    rollupOptions: {
        input: {
            pc: index.html完整路径,
            pc_user:user.html完整路径，
            pc_product:product.html完整路径,
            其他相关的html文件配置，
            mobile: index.html完整路径,
            mobile_user:user.html完整路径，
            mobile_product:product.html完整路径,
            其他相关的html文件配置，
        }
    }
}
```
