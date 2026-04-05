import { loginAction } from './action'
import styles from './page.module.css'

export default function LoginPage() {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.title}>管理システム ログイン</h1>
                <p className={styles.desc}>パスワードを入力してください。</p>
                <form action={loginAction} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="password"
                            placeholder="パスワード"
                            required
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    )
}
