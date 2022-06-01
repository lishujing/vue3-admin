<template>
	<div class="login-container">
		<!-- 顶部logo -->
		<div class="login-title">
			<img src="@/assets/images/logo-dp.png" alt="logo" />
		</div>

		<div class="login-contant">
			<img src="@/assets/images/login_new.png" alt="image" class="login-img" />
			<el-form
				class="login-form"
				ref="loginFormRef"
				:model="loginForm"
				:rules="loginRules"
			>
				<div class="title-container">
					<h3 class="title">
						HELLO,
						<br />
						<p class="title-name">智能云设计平台</p>
					</h3>
				</div>
				<div class="form-fields">
					<!-- 黄色条条 -->
					<i :style="{ top: activeTop + '%' }" />
					<!-- 中间条条 -->
					<b />
					<div>
						<p>用户名</p>
						<el-form-item prop="username">
							<!-- <span class="svg-container">
                <svg-icon icon="user"></svg-icon>
              </span> -->
							<el-input
								size="medium"
								placeholder="用户名"
                autofocus="true"
								name="username"
								type="text"
								tabindex="1"
								autocomplete="on"
								v-model="loginForm.username"
								@focus="setTop('0')"
                @change="getPsw"
							></el-input>
						</el-form-item>
						<!-- password -->

						<!-- 功能原理：
              实现密码框 密文/明文 两种状态的切换，可通过动态切换 input 的 type 类型即可实现
              当 type = 'password' 为密文显示
              当 type = 'text' 为明文显示
            -->
					</div>
					<div>
						<p>密码</p>
						<input
							name="password"
							type="password"
							autocomplete="off"
							class="take"
						/>
						<el-tooltip
							v-model="capsTooltip"
							content="Caps lock is On"
							placement="right"
							manual
						>
							<el-form-item prop="password">
								<!-- <span class="svg-container">
                <svg-icon icon="password"></svg-icon>
              </span> -->
								<el-input
									size="medium"
									:key="passwordType"
									:type="passwordType"
									placeholder="用户密码"
									name="password"
									tabindex="2"
									autocomplete="on"
									v-model="loginForm.password"
									@focus="setTop('50')"
									@blur="capsTooltip = false"
                  @keyup="checkCapslock"
								>
								</el-input>
								<span class="show-pwd" @click="onChangePwdType">
									<svg-icon
                    className="show-pwd-icon"
										:icon="passwordType === 'password' ? 'eye' : 'eye-open'"
									></svg-icon>
								</span>
							</el-form-item>
						</el-tooltip>
					</div>
				</div>
				<div class="control">
					<div class="remember">
						<input v-model="rememberPsw" type="checkbox" />
						<p>记住密码</p>
					</div>
				</div>
				<!-- 登录按钮 -->
				<el-button
					type="primary"
					:loading="loading"
					@click="handlerLogin"
					class="login-btn"
					>登录</el-button
				>
			</el-form>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { validatePassword } from './rules'
import { Decrypt, Encrypt } from '@/utils/index'
import cookies from "js-cookie"
// 数据源
const loginForm = ref({
  username: '',
  password: '',
})
// 验证规则
const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule'),
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword(),
    },
  ],
})

// 处理密码框文本显示
const passwordType = ref('password')
// template 中绑定的方法，直接声明即可
const onChangePwdType = () => {
  // 当 passwordType 的值为 password 的时候，改为 text
  // 使用 ref 声明的数据，在 script 中使用时，需要加 value 来获取具体的值，但是在template 中使用的时候，则不需要加value
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 处理登录
const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handlerLogin = () => {
  // 1、进行表单校验
  console.log(loginFormRef.value)
  loginFormRef.value.validate(valid => {
    if (!valid) return
    // 2、触发登录动作
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // TODO: 3、进行登录后处理
        setCookiePsw()
      })
      .catch(err => {
        console.log(err)
        loading.value = false
      })
  })
}

// 滑动条块得top控制
const activeTop = ref(null)
const setTop = val => {
  activeTop.value = val
}
// 记住密码
const rememberPsw = ref(false)
const setCookiePsw = () => {
  if (rememberPsw.value) {
    cookies.set(
			`u_${loginForm.value.username}`,
			Encrypt(loginForm.value.password),
			{
			  expires: 15,
			}
    )
  }
}
// 获取存储的密码并解密
const getPsw = () => {
  const cookVal = cookies.get(`u_${loginForm.value.username}`)
  loginForm.value.password = cookVal && Decrypt(cookVal)
}
// 检测大写锁定键是否开启
const capsTooltip = ref(false)
const checkCapslock = e => {
  const { key } = e
  capsTooltip.value = key && key.length === 1 && key >= 'A' && key <= 'Z'
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
$themeColor: #2d3a4b;
div{
  box-sizing: border-box;
  line-height: 1.15;
}

.login-container .el-input input {
	color: #000;
	background: #fff;
}

.login-container {
	.el-input {
		display: inline-block;
		width: 100%;
		input {
			-webkit-appearance: none;
			caret-color: rgba($color: #000000, $alpha: 0.3);
			border: 1px solid #fff;
			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px #eee inset !important;
				-webkit-text-fill-color: #666 !important;
			}
		}
	}
	.el-form-item {
		border-radius: 5px;
		color: #454545;
	}
}

.verifybox {
	position: absolute;
	left: auto;
	right: 30%;
	transform: translate(50%, -50%);
}
.take {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}

.login-container {
	height: 100%;
	width: 100%;
	overflow: hidden;
	.login-title {
		width: 100%;
		height: 60px;
		padding: 10px 60px;
		display: flex;
		align-items: center;
		img {
			width: 10%;
			display: block;
		}
	}

	.login-contant {
		position: relative;
		width: 100%;
		height: calc(100% - 60px);
		.login-img {
			display: block;
			width: 100%;
			height: 100%;
		}
		.login-form {
			position: absolute;
			top: 50%;
			right: 30%;
			transform: translate(50%, -50%);
			min-width: 400px;
			width: 22%;
			height: 460px;
			background-color: #ffffff;
			border-radius: 11px;
			padding: 30px;
			overflow: hidden;
			.title-container {
				position: relative;
				.title {
					font-size: 24px;
					color: #1a1a1a;
          padding: 21.75px 0;
					.title-name {
						margin: 0;
						font-size: 18px;
					}
				}
				.set-language {
					color: #fff;
					position: absolute;
					top: 3px;
					font-size: 18px;
					right: 0px;
					cursor: pointer;
				}
			}
			.form-fields {
				position: relative;
				width: 100%;
				overflow: hidden;
				padding: 5px 16px;
				background: #ffffff;
				border: 1px solid #e0e0e0;
				box-shadow: 0 0 14px 4px rgba(230, 229, 229, 0.5);
				border-radius: 4px 10px 10px 4px;
				i {
					position: absolute;
					top: -50%;
					left: 0;
					width: 4px;
					height: 50%;
					transition: top 0.2s;
					background: $themeColor;
					border-radius: 14px;
				}
				b {
					position: absolute;
					top: 50%;
					left: 0;
					width: 100%;
					height: 1px;
					background: #e0e0e0;
					border-radius: 2px;
					margin-top: -0.5px;
				}
				p {
					margin: 0;
					padding: 0;
					line-height: 32px;
					height: 32px;
					font-size: 12px;
					color: #666;
				}
				.show-pwd {
					position: absolute;
					right: 24px;
					top: 0px;
					font-size: 16px;
					color: #889aa4;
					cursor: pointer;
					user-select: none;
					.el-icon-view:before {
						line-height: 30px;
					}
          .show-pwd-icon {
            fill: #889aa4;
          }
				}
			}
			.control {
				width: 100%;
				height: 70px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;
				color: #919191;
				.remember {
					width: 36%;
					display: flex;
					align-items: center;
					p {
						padding-left: 8px;
					}
					& > input {
						position: relative;
						width: 14px;
						height: 14px;
					}
					& > input:checked::before {
						content: '\2713';
						background-color: $themeColor;
						position: absolute;
						top: 0;
						left: 0px;
						padding-left: 1.5px;
						width: 100%;
						height: 100%;
						border: 1px solid $themeColor;
						border-radius: 2px;
						font-size: 12px;
						color: white;
						font-weight: bold;
					}
				}
			}
			.login-btn {
				width: 340px;
				height: 40px;
				background: $themeColor;
				border: none;
				border-radius: 10px;
				font-size: 16px;
				color: #ffffff;
				text-align: center;
			}
		}
	}

	// .login-form {
	//   position: relative;
	//   width: 520px;
	//   max-width: 100%;
	//   padding: 160px 35px 0;
	//   margin: 0 auto;
	//   overflow: hidden;

	//   :deep(.el-form-item) {
	//     border: 1px solid rgba(255, 255, 255, 0.1);
	//     background: rgba(0, 0, 0, 0.1);
	//     border-radius: 5px;
	//     color: #454545;
	//   }

	//   :deep(.el-input) {
	//     display: inline-block;
	//     height: 47px;
	//     width: 85%;

	//     input {
	//       background: transparent;
	//       border: 0px;
	//       -webkit-appearance: none;
	//       border-radius: 0px;
	//       padding: 12px 5px 12px 15px;
	//       color: $light_gray;
	//       height: 47px;
	//       caret-color: $cursor; // 设置 input 元素中光标的颜色
	//     }
	//   }
	// }

	// .svg-container {
	//   padding: 6px 5px 6px 15px;
	//   color: $dark_gray;
	//   vertical-align: middle;
	//   display: inline-block;
	// }

	// .title-container {
	//   position: relative;

	//   .title {
	//     font-size: 26px;
	//     color: $light_gray;
	//     margin: 0px auto 40px auto;
	//     text-align: center;
	//     font-weight: bold;
	//   }
	// }

	// .show-pwd {
	//   position: absolute;
	//   right: 10px;
	//   font-size: 16px;
	//   color: $dark_gray;
	//   cursor: pointer;
	//   user-select: none; // user-select 属性规定是否能选取元素的文本。 // 在 web 浏览器中，如果您在文本上双击，文本会被选取或高亮显示。此属性用于阻止这种行为。
	// }
}
</style>
