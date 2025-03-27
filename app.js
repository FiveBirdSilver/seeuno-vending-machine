"use strict";
class VendingMachine {
    // 생성자 초기화
    constructor() {
        this.currentPaymentMethod = null;
        this.drinks = [
            { name: '콜라', image: 'cola', price: 1100, stock: 10 },
            { name: '물', image: 'water', price: 600, stock: 15 },
            { name: '커피', image: 'coffee', price: 700, stock: 20 }
        ];
        this.balance = 0;
        this.validCashDenominations = [100, 500, 1000, 5000, 10000];
        this.paymentMethod = [{
                name: '현금',
                type: 'cash'
            }, {
                name: '카드',
                type: 'card'
            }];
        this.initializeUI();
        this.renderPaymentMethodButtons();
        this.renderDrinkButtons();
    }
    // UI 요소 초기화 
    initializeUI() {
        this.cashBalanceContainer = document.getElementById('cash-balance');
        this.cashButtonsContainer = document.getElementById('cash-inputs');
        this.drinkButtonsContainer = document.getElementById('drink-buttons');
        this.paymentMethodButtonsContainer = document.getElementById('payment-method-select');
        this.returnButton = document.getElementById('return-button');
    }
    // 현금 투입 메서드
    insertCash(amount) {
        this.balance += amount;
        this.updateCash();
        return true;
    }
    // 음료 선택 메서드
    selectDrink(drinkType) {
        const selectedDrink = this.drinks.find(drink => drink.name === drinkType);
        if (!this.currentPaymentMethod) {
            this.showMessage('결제 수단을 먼저 선택해주세요.');
            return;
        }
        if (selectedDrink.stock <= 0) {
            this.showMessage('해당 음료는 품절되었습니다.');
            return;
        }
        if (this.currentPaymentMethod === 'cash' && this.balance < selectedDrink.price) {
            this.showMessage('잔액이 부족합니다.');
            return;
        }
        // 음료 구매 로직
        if (this.currentPaymentMethod === 'cash') {
            this.balance -= selectedDrink.price;
            this.updateCash();
        }
        selectedDrink.stock--;
        this.showMessage(`${drinkType} 음료가 나왔습니다.${this.currentPaymentMethod === 'cash' ? ` 잔액은 ${this.balance}원 입니다.` : ''}`);
        // 음료 재고 업데이트    
        while (this.drinkButtonsContainer.firstChild) {
            this.drinkButtonsContainer.removeChild(this.drinkButtonsContainer.firstChild);
        }
        this.renderDrinkButtons();
    }
    // 결제 종료 메서드 
    returnPayment(type) {
        switch (type) {
            case 'cash':
                const change = this.balance;
                this.balance = 0;
                this.showMessage(`${change}원 거스름돈이 반환되었습니다.`);
                this.updateCash();
                break;
            case 'card':
                this.showMessage('카드가 반환되었습니다.');
                break;
            default:
                this.showMessage('유효하지 않은 결제 수단입니다.');
                return;
        }
        this.currentPaymentMethod = null;
        this.cashButtonsContainer.style.display = 'none';
        this.cashBalanceContainer.style.display = 'none';
        this.returnButton.style.display = 'none';
    }
    // 결제 수단 렌더링 메서드
    renderPaymentMethodButtons() {
        while (this.paymentMethodButtonsContainer.firstChild) {
            this.paymentMethodButtonsContainer.removeChild(this.paymentMethodButtonsContainer.firstChild);
        }
        this.paymentMethod.forEach(method => {
            const button = document.createElement('button');
            button.className = 'payment-method-button';
            const shadow = document.createElement('span');
            shadow.className = 'shadow';
            button.appendChild(shadow);
            const edge = document.createElement('span');
            edge.className = 'edge';
            button.appendChild(edge);
            const front = document.createElement('span');
            front.className = 'front';
            front.textContent = method.name;
            button.appendChild(front);
            button.onclick = () => this.selectPaymentMethod(method);
            this.paymentMethodButtonsContainer.appendChild(button);
        });
    }
    // 현금 렌더링 메서드
    renderCashButtons() {
        // 기존 버튼들을 모두 제거
        while (this.cashButtonsContainer.firstChild) {
            this.cashButtonsContainer.removeChild(this.cashButtonsContainer.firstChild);
        }
        this.validCashDenominations.forEach(denomination => {
            const button = document.createElement('button');
            button.textContent = `${denomination}원`;
            button.onclick = () => this.insertCash(denomination);
            this.cashButtonsContainer.appendChild(button);
        });
    }
    // 음료 렌더링 메서드
    renderDrinkButtons() {
        this.drinks.forEach(drink => {
            const button = document.createElement('button');
            button.className = 'drink-button';
            const image = document.createElement('img');
            image.className = 'drink-image';
            image.src = `assets/${drink.image}.webp`;
            image.alt = `${drink.name} 이미지`;
            const name = document.createElement('span');
            const price = document.createElement('span');
            const stock = document.createElement('span');
            name.textContent = drink.name;
            name.className = 'drink-name';
            price.textContent = `${drink.price}원`;
            price.className = 'drink-price';
            stock.textContent = `재고: ${drink.stock}개`;
            stock.className = 'drink-stock';
            button.appendChild(image);
            button.appendChild(name);
            button.appendChild(price);
            button.appendChild(stock);
            button.onclick = () => this.selectDrink(drink.name);
            this.drinkButtonsContainer.appendChild(button);
        });
    }
    // 결제 수단 선택 메서드
    selectPaymentMethod(type) {
        if (this.currentPaymentMethod) {
            // 현금 결제이고 잔액이 0원일 때는 결제 수단 변경 허용
            if (this.currentPaymentMethod === 'cash' && this.balance === 0) {
                this.currentPaymentMethod = null;
                this.cashButtonsContainer.style.display = 'none';
                this.cashBalanceContainer.style.display = 'none';
                this.returnButton.style.display = 'none';
            }
            else {
                this.showMessage('이미 결제 수단이 선택되었습니다. 거스름돈이나 카드를 반환 후 이용해주세요.');
                return;
            }
        }
        this.currentPaymentMethod = type.type;
        this.showMessage(`${type.name} 결제가 선택되었습니다.`);
        if (type.type === 'cash') {
            this.renderCashButtons();
            this.cashButtonsContainer.style.display = 'flex';
            this.cashBalanceContainer.style.display = 'flex';
            // 현금일 땐 거스름돈 반환
            this.returnButton.textContent = '거스름돈 반환';
            this.returnButton.style.display = 'flex';
            this.returnButton.onclick = () => this.returnPayment(type.type);
        }
        if (type.type === 'card') {
            this.cashButtonsContainer.style.display = 'none';
            this.cashBalanceContainer.style.display = 'none';
            // 카드일 땐 카드 반환
            this.returnButton.textContent = '카드 반환';
            this.returnButton.style.display = 'flex';
            this.returnButton.onclick = () => this.returnPayment(type.type);
        }
    }
    // 현금 입금 후 잔액 표시 메서드
    updateCash() {
        this.cashBalanceContainer.textContent = `현재 잔액 : ${(this.balance).toLocaleString()}원`;
    }
    // 메시지 표시 메서드
    showMessage(message) {
        alert(message);
    }
}
// 초기화
document.addEventListener('DOMContentLoaded', () => {
    try {
        new VendingMachine();
    }
    catch (error) {
        console.error('자판기 중 오류 발생:', error);
        alert('현재 자판기에 문제가 있습니다. 관리자에게 문의해주세요.');
    }
});
