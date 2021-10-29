function NumberScroll(el, number, options = {}) {
    if(typeof el === 'string') {
        this.el = document.querySelector(el)
    }else {
        this.el = el
    }
    this.el.classList.add('ns')
    if(parseInt(number).toString() === 'NaN') {
        console.error('number需要为数字！')
        return 
    }
    this.number = parseInt(number)
    this.options = options
    this.state = new Array(this.number.toString().length).fill(false)
    this.height = options.height || this.defaultOptions.height
    this.init()
}

NumberScroll.prototype.init = function() {
    const number = this.number.toString()
    const fragment = document.createDocumentFragment()
    for(let i=0;i<number.length;i++) {
        const span = document.createElement('span')
        span.classList.add('every')
        const ul = document.createElement('ul')
        // 添加动画结束回调
        ul.addEventListener('animationend', this.animationFinish(i))
        const b = i % 2 === 0
        if(b) {
            ul.classList.add('ns-fast-up')
        }else {
            ul.classList.add('ns-fast-down')
        }
        for(j=1;j<11;j++) {
            const li = document.createElement('li')
            li.innerText = (parseInt(number.charAt(i)) + j) % 10
            li.style.height = this.height + 'px'
            b ? ul.appendChild(li) : ul.insertBefore(li,ul.children[0])
        }
        
        span.appendChild(ul)
        fragment.append(span)
    }
    this.el.appendChild(fragment)
    this.el.querySelectorAll('.every').forEach(every => {
        every.style.height = this.height + 'px'
    });
}

NumberScroll.prototype.animationFinish = function(i) {
    return (e) => {
        if(this.state[i]) return
        this.state[i] = true
        if(i % 2 === 0) {
            this.el.querySelectorAll('.every ul')[i].classList.remove('ns-fast-up')
            this.el.querySelectorAll('.every ul')[i].classList.add('ns-slow-up')
        }else {
            this.el.querySelectorAll('.every ul')[i].classList.remove('ns-fast-down')
            this.el.querySelectorAll('.every ul')[i].classList.add('ns-slow-down')
        }
    }
}


NumberScroll.prototype.defaultOptions = {
    time: 1000,
    height: 20
}