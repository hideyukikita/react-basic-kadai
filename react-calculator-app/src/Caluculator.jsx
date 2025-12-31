import React, { useState } from 'react';
import styles from './App.css';

export function Calculator() {
    // 表示欄の状態管理
    const [display, setDisplay] = useState('');
    
    //表示欄の更新イベントハンドラ定義
    // クリアボタン押下時アクション
    const handleClear = () => {
        setDisplay('');
    }
    // イコールボタン押下時アクション
    const handleEqual = () => {
        try {
            const result = calculate(display);
            setDisplay(String(result));
        } catch (error) {
            setDisplay('Error');
        }   
    }
    // 数字・演算子ボタン押下時アクション
    const handleButtonClick = (value) => {
        if(value === 'C'){
            handleClear();
        } else if (value === '='){
            handleEqual();
        } else {
            setDisplay((prev) => prev + value);
        }
    }

    //計算を実行するメソッド
    const calculate = (expression) => {
        // 入力形式の確認
        const validExpression = /^(\d+)([+\-*/])(\d+)$/;
        //有効な式かどうかの確認
        const match = expression.match(validExpression);
        if(!match){
            throw new Error('無効な式です。')
        }
        //計算用
        const num1 = Number(match[1]);
        const operator = match[2];
        const num2 = Number(match[3]);
        //計算実行
        let result;
        switch(operator){
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if(num2 === 0){
                    throw new Error('0で割ることはできません。');
                }
                result = num1 / num2;
                break;
        }
        return result;

    }

    //ボタンの配置を表す配列
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', 'C', '=', '+'
    ]

    return (
        <>
            <h2>電卓アプリ</h2>
            <div className="styles.calculate-container">
                {display === '' ? '0' : display}
            </div>
            <div className="styles.button-grid">
                {buttons.map((btn) => (
                    <button key={btn} onClick={() => handleButtonClick(btn)}>{btn}</button>
                ))}
            </div>
        </>
    )

}