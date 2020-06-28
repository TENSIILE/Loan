const header    = document.querySelector('.navbar')
const arrow_up  = document.querySelector('.arrow-up')
const menu      = document.querySelector('.menu')

document.addEventListener('scroll', () => {
    if(window.pageYOffset > 500){
        header.classList.add('scrollNavigation')
        arrow_up.classList.add('visible')
    }else{
        if(!menu.classList.contains('open')){
            header.classList.remove('scrollNavigation')
            arrow_up.classList.remove('visible')
        }  
    }
})

arrow_up.addEventListener('click', () => {
    arrow_up.classList.add('active-click')
    setTimeout(() => {
        arrow_up.classList.remove('active-click')
    },1000)
    window.scrollTo(0,0)
})


new WOW({
    mobile:false,
    live:true,
}).init()

const preloader = () => {
    const preload    = document.querySelector('.preloader')

    const heading    = document.querySelector('.intro-message h1')
    const button     = document.querySelector('.intro-message button')
    const section_a  = document.querySelector('.content-section-a .container')

    const successLoadedDocument = () => {
        setTimeout(() => {
            document.body.style.overflow = 'scroll'
            preload.classList.add('destroy')
            heading.classList.add('animated')
            heading.classList.add('bounceInDown')
            
            button.classList.add('animated')
            button.classList.add('bounceInUp')
    
            section_a.classList.add('animated')
            section_a.classList.add('bounceInLeft')
        },1000)
    }

    window.addEventListener('load', successLoadedDocument )
    
}
preloader()

const setHeadingBackground = () => {
    if(window.pageYOffset > 500){
        setTimeout(() =>{
            header.classList.add('scrollNavigation')
            arrow_up.classList.add('visible')
        },100) 
    }
}

window.addEventListener('load', () => setHeadingBackground)


const slider = () => {
    const ulParent       = document.querySelector('.portfolio-dots')
    const ul             = document.querySelectorAll('li.portfolio-item')
    const arrow          = document.querySelectorAll('a.portfolio-btn')
    let prev_active_img  = document.querySelector('li.portfolio-item-active')
 
    let global_index     = 0
    let interval

    const generateDots = (extraClass = null) => {
        const new_li = document.createElement('li')
        new_li.classList.add('dot')
        ulParent.append(new_li)
        if(extraClass != null){
            new_li.classList.add(extraClass)
        }
    }

    for(let i = 0; i < ul.length; i++){
        i == 0 ? generateDots('dot-active') : generateDots() 
    }

    const dots           = document.querySelectorAll('ul.portfolio-dots li')
    let prev_active_dots = document.querySelector('li.dot-active')

    dots.forEach(item => {
        item.addEventListener('click', e => {
            const index  = [...dots].indexOf(item)
            global_index = index
            
            deletePrevValue(index)
            change(index)
            changePrevValue(item)
        })
        setTimeout(() => item.addEventListener('touchend', onAnimateFrame),3000) 
    })


    const movingStarted =  (e, typeScreen) => typeScreen == 'mobile' ?
            (startpoint = e.touches[0].clientX , offAnimateFrame())  : startpoint = e.clientX

    const movingMove = (e, typeScreen) => {
        if(typeScreen == 'mobile'){
            if(e.touches[0].clientX < startpoint){
                startSuccess = true
                side         = 'right'
            }else{
                startSuccess = true
                side         = 'left'
            }
        }else{
            if(e.clientX < startpoint){
                startSuccess = true
                side         = 'right'
            }else{
                startSuccess = true
                side         = 'left'
            }
        }
    }

    const moving = (typeScreen) => {
        if(startSuccess      && side == 'right') shiftSlideRight()
        else if(startSuccess && side == 'left')  shiftSlideLeft()
        
        startSuccess  = false
        side          = ''
        if(typeScreen == 'mobile') onAnimateFrame()
    }

    let startpoint   = 0
    let startSuccess = false
    let side         = ''

    ul.forEach(item => {
        item.addEventListener('touchstart', e => movingStarted(e,'mobile'))
        item.addEventListener('touchmove',  e => movingMove(e,'mobile'))
        item.addEventListener('touchend',  () => moving('mobile'))


        item.addEventListener('mousedown', e => {
            movingStarted(e,'desktop')
            item.addEventListener('mousemove', e => movingMove(e, 'desktop'))
        })

        item.addEventListener('mouseup', () => {
            item.removeEventListener('mousemove', movingMove)
            moving('desktop')
        })
    })

    const change = index => ul[index].classList.add('portfolio-item-active')
    

    const deletePrevValue = index => {
        prev_active_img.classList.remove('portfolio-item-active')
        prev_active_img = ul[index]
    }

    const changePrevValue = item => {
        prev_active_dots.classList.remove('dot-active')
        prev_active_dots = item
        prev_active_dots.classList.add('dot-active')
    }

    const wrapperActionSlider = index => {
        deletePrevValue(index)
        change(index)
        changePrevValue(dots[index])
    }

    const shiftSlideRight = () => {
        if(global_index == ul.length - 1){ global_index = 0}else{ global_index++}
        wrapperActionSlider(global_index)
    }
    const shiftSlideLeft = () => {
        if(global_index == 0){ global_index = ul.length - 1}else{ global_index--}
        wrapperActionSlider(global_index)
    }

    const onAnimateFrame  = () => interval = setInterval(shiftSlideRight,3000)
    const offAnimateFrame = () => clearInterval(interval)

    onAnimateFrame()

    arrow[0].addEventListener('click', e => {
        e.preventDefault()
        shiftSlideLeft()
    })
    arrow[1].addEventListener('click', e => {
        e.preventDefault()
        shiftSlideRight()
    })

    ul[0].parentNode.addEventListener('mouseover', offAnimateFrame)
    ul[0].parentNode.addEventListener('mouseleave', onAnimateFrame)

}

slider()





const container_img_fixed = document.querySelector('.intro-header')
window.onmousemove = e => {
    let x = - e.clientX / 20,
        y = - e.clientY / 20
        container_img_fixed.style.backgroundPositionX = x + 'px'
        container_img_fixed.style.backgroundPositionY = y + 'px'
}






const arrow_down = document.querySelector('.arrow-down')
arrow_down.addEventListener('click', e => {
    e.preventDefault()
    window.scrollTo(0,document.body.scrollHeight)
})






const download_btn   = document.getElementById('download')
const modalContainer = document.querySelector('.modalContainer')
const modalBtnSend   = document.querySelector('.modal .footer .btn.send')
const modalBtnSkip   = document.querySelector('.modal .footer .btn.skip')
const modalClose     = document.querySelector('.modal .header #close')
const notification   = document.querySelector('.notification')
const textarea       = document.querySelector('.modalContainer textarea')


const CLOSE = () => {
    modalContainer.classList.remove('open')
    document.body.style.cssText = 'overflow:scroll;'
    setHeadingBackground()
}

download_btn.addEventListener('click', () => {
    modalContainer.classList.add('open')
    document.body.style.cssText = 'overflow:hidden;'
    menu.classList.remove('open')
    document.querySelector('.burger .ham').classList.remove('active')
    header.classList.remove('scrollNavigation') 
})

modalClose.addEventListener('click', CLOSE)

modalBtnSend.addEventListener('click', () => {
    CLOSE()
    notification.classList.add('opened')
    textarea.value = ''
    
    setTimeout(() => {
        notification.classList.remove('opened')
    },3000)
})

modalBtnSkip.addEventListener('click', CLOSE)






let isDeleteLinkAnimate = false

window.addEventListener('load', () => {
    const head        = document.getElementsByTagName('head')[0]
    let linkAnimateClone
    const linkAnimate = linkAnimateClone = head.getElementsByTagName('link')
    let linkAnimateIndex
    const hrefAnimate = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'

    for(let i = 0; i < linkAnimate.length; i++){

        if(linkAnimate[i].href == hrefAnimate){
            linkAnimateIndex = i
            break
        }
    }

    if(window.innerWidth <= 672){
        if(!isDeleteLinkAnimate){
            linkAnimate[linkAnimateIndex].remove()
            isDeleteLinkAnimate = !isDeleteLinkAnimate
        } 
    }else{
        if(isDeleteLinkAnimate){
            const styleElement  = document.createElement("link")
            styleElement.href   = hrefAnimate 
            
            styleElement.rel    = 'stylesheet'
            document.getElementsByTagName("head")[0].appendChild(styleElement)
            isDeleteLinkAnimate = !isDeleteLinkAnimate
        }
    }
})




const helpKeyboardHandler  = document.querySelector('.helpKeyboardHandler')
const textHelpKeyboard     = document.querySelector('.helpKeyboardHandler .text')
const inputHelpKeyboard    = document.querySelector('.helpKeyboardHandler input')
const buttonHelpKeyboard   = document.querySelector('.helpKeyboardHandler button')

const iconKeyboard         = document.getElementById('icon-keyboard')
const virtualKeyboard      = document.querySelector('.virtualKeyboard')
const virtualKeyboardClose = document.querySelector('.virtualKeyboard #close')
const kBoard               = virtualKeyboard.querySelector('.keyboard')

let speedMoveKeyboard 

const encodeData = str => String(Number(str).toString(2)).split('').map(value => value.charCodeAt()).reverse().join('0')
const decodeData = str => parseInt(str.split('0').reverse().map(value => String.fromCharCode(value)).join(''),2)

if(localStorage.getItem('speedMoveKeyboard')){
    speedMoveKeyboard = decodeData(localStorage.getItem('speedMoveKeyboard'))
}else{
    speedMoveKeyboard = 1
}



let virtualKeyboardBottom = 0
let virtualKeyboardLeft   = 50

document.addEventListener('keydown', e => {
          if(e.ctrlKey && e.key == "ArrowUp")    { virtualKeyboardBottom <= 70  ? virtualKeyboardBottom +=speedMoveKeyboard  : virtualKeyboardBottom = 71
    }else if(e.ctrlKey && e.key == "ArrowDown")  { virtualKeyboardBottom >= 1   ? virtualKeyboardBottom -= speedMoveKeyboard : virtualKeyboardBottom = 0
    }else if(e.ctrlKey && e.key == "ArrowLeft")  { virtualKeyboardLeft   >= 20  ? virtualKeyboardLeft   -= speedMoveKeyboard : virtualKeyboardLeft   = 27
    }else if(e.ctrlKey && e.key == "ArrowRight") { virtualKeyboardLeft   <= 74  ? virtualKeyboardLeft   +=speedMoveKeyboard  : virtualKeyboardLeft   = 73
    }
    virtualKeyboard.style.bottom = virtualKeyboardBottom + '%'
    virtualKeyboard.style.left   = virtualKeyboardLeft   + '%'
})

const mess = [
    'Для взаимодействия с перемещением виртуальной клавиатуры вам понадобится:\n',
    'Удерживать клавишу <span id="keys">Ctrl</span> + <span id="keys">⬆</span> | <span id="keys">⬅</span> | <span id="keys">⬇</span> | <span id="keys">➡</span>.\n\n',
    'Вы можете установить скорость перемещения клавиатуры по экрану, но только один раз.\n',
    'К сожалению, на данном этапе проектирования сайта, экранная клавиатура не работает, но не стоит отчаиваться, ведь совсем скоро разработчик выпустит обновления, после сдачи экзамена))\n',
]


const typeText = config => {
    let line   = 0
    let count  = 0
    let out    = ""

    const typeLine = config => {
        let interval = setTimeout(() => {
            out += config[line][count]
            textHelpKeyboard.innerHTML = out
            count++

            if(count >= config[line].length){
                count = 0
                line++
                if(line == config.length){
                    clearInterval(interval)
                    return true
                }
            }
            typeLine(config)
        },10)
    }
    typeLine(config)
}

const openKeyboard = e => {
    if(localStorage.getItem('settingKeyBoard') != 'configured'){
        const lighterBtn = virtualKeyboard.querySelectorAll('.lighter')
        document.body.style.overflow = 'hidden'
        helpKeyboardHandler.classList.add('open')
        typeText(mess)
        virtualKeyboard.classList.add('visible')
        virtualKeyboard.classList.add('darken')
        kBoard.classList.add('darken')
        
        lighterBtn.forEach(btn => btn.classList.add('shine'))
    }else{
        virtualKeyboard.classList.toggle('visible')
    }
}


const closeKeyboard = e => !helpKeyboardHandler.classList.contains('open') ? virtualKeyboard.classList.remove('visible') : void 0

virtualKeyboardClose.addEventListener('click', closeKeyboard)
iconKeyboard.addEventListener('click', openKeyboard)


inputHelpKeyboard.addEventListener('keydown', e => {
    if(e.code == 'Enter'){
        if(String(inputHelpKeyboard.value).trim() != "" && inputHelpKeyboard.value != 0){
            speedMoveKeyboard = +inputHelpKeyboard.value
            inputHelpKeyboard.classList.add('success')
            buttonHelpKeyboard.classList.add('visible')
        } 
    }
})

inputHelpKeyboard.addEventListener('keypress', e => {
    if (e.keyCode != 43 && e.keyCode < 48 || e.keyCode > 57)
    e.preventDefault()

    if(e.code != 'Enter'){
        buttonHelpKeyboard.classList.remove('visible')
        inputHelpKeyboard.focus()
        inputHelpKeyboard.classList.remove('success') 
    }
})

inputHelpKeyboard.addEventListener('paste', () => isFinite(inputHelpKeyboard.value) ? setTimeout(() => inputHelpKeyboard.value = '', 200) : void 0)

buttonHelpKeyboard.addEventListener('click', () => {
    helpKeyboardHandler.classList.remove('open')
    document.body.style.overflow = 'scroll'
    virtualKeyboard.classList.remove('visible')
    virtualKeyboard.classList.remove('darken')
    kBoard.classList.remove('darken')

    if(isNaN(speedMoveKeyboard)) speedMoveKeyboard = 1
    localStorage.setItem('settingKeyBoard', 'configured')
    localStorage.setItem('speedMoveKeyboard', encodeData(speedMoveKeyboard))
    buttonHelpKeyboard.classList.remove('visible')
    inputHelpKeyboard.classList.remove('success') 
})










const checkInnerWidth = () => {
    if(window.innerWidth <= 672){
        menu.classList.add('mobile')
        iconKeyboard.style.display = 'none'
        virtualKeyboard.classList.remove('visible')
        helpKeyboardHandler.classList.remove('open')  
    }else{
        menu.classList.remove('mobile')
        menu.classList.remove('open')
        document.querySelector('.burger .ham').classList.remove('active')
        header.classList.remove('scrollNavigation') 
        iconKeyboard.style.display = 'block'
    }
    checkResizeHeaderHelloBlock()
}


window.addEventListener('resize', checkInnerWidth)
window.addEventListener('load', checkInnerWidth)






const burger = document.querySelector('.burger .ham')
const theme  = document.querySelector('.burger .theme-ico')

burger.addEventListener('click', () => {
    menu.classList.toggle('open')
    setTimeout(() => {
        if(window.pageYOffset >= 500){
            header.classList.add('scrollNavigation')
        }else{
            header.classList.toggle('scrollNavigation')
        }
    },1000)
})









const styleElement = document.createElement("style") 
document.getElementsByTagName("head")[0].appendChild(styleElement)

const checkResizeHeaderHelloBlock = () => {
    const intro_header  = document.querySelector('.intro-header') 
    let i_header_height =  Math.ceil(intro_header.getBoundingClientRect().height)

    let newElem = document.createTextNode(
        `::-webkit-scrollbar-thumb {
            height: ${i_header_height}px;
    }`)

    if(styleElement.children.length == 0){
        styleElement.appendChild(newElem)
    }else{
        try{styleElement.removeChild(styleElement.lastChild)}catch{}
        styleElement.appendChild(newElem)
    }
}





const imageHandlerContainer = document.querySelector('.imageHandlerContainer')
const allImage              = document.querySelectorAll('img.responsibility-img')

const deployImageToContainer = e => {
    imageHandlerContainer.classList.add('open')
    document.body.style.cssText = 'overflow:hidden;'

    const img = imageHandlerContainer.children[0]
    img.style.width = '20%'
    img.setAttribute('src',e.target.getAttribute('src')) 

    window.addEventListener('wheel', e => {
        let value = parseInt(img.style.width) + parseInt(Math.floor(-e.deltaY / 20))
        
        if(value >= 100)     img.style.width = 100   + '%'
        else if(value <= 10) img.style.width = 10    + '%'
        else                 img.style.width = value + '%'
          
    })
}

allImage.forEach(item => item.addEventListener('click', deployImageToContainer))

const uninstallViewContainerImageHandler = () => {
    imageHandlerContainer.classList.remove('open')
    document.body.style.cssText = 'overflow:scroll;'
    setTimeout(() => {
        imageHandlerContainer.children[0].style.webkitTransform = imageHandlerContainer.children[0].style.transform =`translate(0px, 0px)`
        imageHandlerContainer.children[0].setAttribute('data-x', 0)
        imageHandlerContainer.children[0].setAttribute('data-y', 0)
    },1000)
    
}
imageHandlerContainer.addEventListener('dblclick', uninstallViewContainerImageHandler)
imageHandlerContainer.addEventListener('touchstart', uninstallViewContainerImageHandler)



const dragMoveListener = e => {
    let target = e.target
    
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy
  
    target.style.webkitTransform = target.style.transform =`translate(${x}px, ${y}px)`
  
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}


interact('.draggable')
  .draggable({
    
    inertia: true,

    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],

    autoScroll: true,

    listeners: {
      move: dragMoveListener,
    }
  })

window.dragMoveListener = dragMoveListener

interact('.draggable-non-event').draggable({listeners:{move:() => {}}})





let selectComponent
let themesSetting = 'light'

const eventRightMouseContextMenu = () => {
    document.oncontextmenu = () => false
    const contextmenu      = document.querySelector('.contextmenu')
    const themes           = document.querySelector('.contextmenu #themes')
    const levelup          = document.querySelector('.contextmenu #levelup')
    const leveldown        = document.querySelector('.contextmenu #leveldown')
    const update           = document.querySelector('.contextmenu #update')
    const copy             = document.querySelector('.contextmenu #copy')
    const paste            = document.querySelector('.contextmenu #paste')
    const clipboard        = document.querySelector('.contextmenu #clipboard')

    const dataColor = {
        light: [
            ['--color-text', '#333'],
            ['--color-background', 'white'],
            ['--color-themes-1','#bd69a2fb'],
            ['--color-themes-2','#a06ad7fb'],
            ['--color-background-white-50p','#ffffff1a'],
            ['--color-grey','#e4e4e4b3'],
            ['--color-underline','#a06ad7fb'],
            ['--color-underline-light','white'],
        ],
        dark: [
            ['--color-text', '#e6e6e6'],
            ['--color-background', '#1a1c1f'],
            ['--color-themes-1','#52414df7'],
            ['--color-themes-2','#592a88fb'],
            ['--color-background-white-50p','#ffffff0a'],
            ['--color-grey','#151719b3'],
            ['--color-underline','#a06ad7fb'],
            ['--color-underline-light','white'],
        ]
    }

    const hrs = contextmenu.querySelectorAll('hr')

    const changeThemes = () => {
        if(themesSetting != 'light'){
            setDarkMode()
            themesSetting = 'light'
            theme.classList.remove('set')
        }else{
            setLightMode()
            themesSetting = 'dark'
            theme.classList.add('set')
        }
        localStorage.setItem('themes', themesSetting)
    }

    themes.addEventListener('click', changeThemes)
    theme.addEventListener('click', changeThemes)

    document.addEventListener('keydown', e => {
        if(e.code == 'KeyT' && e.altKey) changeThemes()
    })

    const setDarkMode = () => {
        for(let i = 0; i < dataColor.light.length; i++){
            document.documentElement.style.setProperty(dataColor.light[i][0], dataColor.light[i][1])
        }
        hrs.forEach(hr => hr.classList.remove('dark'))
    }

    const setLightMode = () => {
        for(let i = 0; i < dataColor.dark.length; i++){
            document.documentElement.style.setProperty(dataColor.dark[i][0], dataColor.dark[i][1])
        }
        hrs.forEach(hr => hr.classList.add('dark'))
    }

    if(localStorage.getItem('themes')){
        themesSetting = localStorage.getItem('themes')
        if(themesSetting != 'light'){
            setLightMode()
            theme.classList.add('set')
        }else{
            setDarkMode()
            theme.classList.remove('set')
        }
    }

    levelup.addEventListener('click',   () => window.scrollTo(0,0))

    leveldown.addEventListener('click', () =>  window.scrollTo(0,document.body.scrollHeight))

    update.addEventListener('click',    () => window.location.reload())

    copy.addEventListener('click', () => {
        let range = document.createRange()
        range.selectNode(selectComponent)
        window.getSelection().addRange(range)

        clipboard.value = window.getSelection().toString()

        document.execCommand('copy')
        window.getSelection().removeAllRanges()

        selectComponent.classList.add('pulse-on')

        setTimeout(() => selectComponent.classList.remove('pulse-on'),1000)   
    })

    paste.addEventListener('click', () => selectComponent.value = clipboard.value)

    const actionContentMenuFunc = e => {
        selectComponent = e.target

        if(window.innerHeight - e.clientY <= contextmenu.getBoundingClientRect().height){
            if(contextmenu.classList.contains('actived')){
                contextmenu.style.top  = e.pageY - contextmenu.getBoundingClientRect().height + 'px'
            }else{
                contextmenu.style.top  = e.pageY - contextmenu.getBoundingClientRect().height + (contextmenu.getBoundingClientRect().height / 3) + 'px'
            }
        }else{
            contextmenu.style.top  = e.pageY + 'px'
        }
 
        if(window.innerWidth - e.clientX >= 250){
            contextmenu.style.left = e.clientX + 'px'
            contextmenu.classList.add('actived')
        }else{
            contextmenu.style.left = e.clientX - 250 + 'px'
            contextmenu.classList.add('actived')
        } 
    }

    document.addEventListener('mousedown', e => {if(e.which == 3) actionContentMenuFunc(e)})

    document.addEventListener('mouseup',   e => {if(e.which == 1) contextmenu.classList.remove('actived')})

}
eventRightMouseContextMenu()

