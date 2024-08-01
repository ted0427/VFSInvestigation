const list = {
    places: [
        "9동", "10동", "11동", "12동"
    ],
    items : [
        "의자", "책상", "노트북", "핸드폰"
    ],
    methods : [
        "혈흔 감식", "시신 부검", "디지털 포렌식", "지문 감식", "DNA 검사"
    ],
    results : [
        {
            place: "9동", 
            item: "의자",
            method: "혈흔 감식",
            result: {
                type: "no-code",
                text: "바퀴벌레가 나왔다.",
                image: "testImg.png"
            }
        }, {
            place: "9동", 
            item: "의자",
            method: "디지털 포렌식",
            result: {
                type: "code",
                code: "5678",
                image: "testImg.png"
            }
        }, {
            place: "9동", 
            item: "책상",
            method: "디지털 포렌식",
            result: {
                type: "code",
                code: "1234",
                image: "testImg.png"
            }
        }
    ]
};

list.places.forEach(value => {
    const selectElement = document.getElementById('place');
    const option = document.createElement('option');
    option.value = value; // Set the value attribute
    option.textContent = value; // Set the display text
    selectElement.appendChild(option);
});
list.items.forEach(value => {
    const selectElement = document.getElementById('item');
    const option = document.createElement('option');
    option.value = value; // Set the value attribute
    option.textContent = value; // Set the display text
    selectElement.appendChild(option);
});
list.methods.forEach(value => {
    const selectElement = document.getElementById('method');
    const option = document.createElement('option');
    option.value = value; // Set the value attribute
    option.textContent = value; // Set the display text
    selectElement.appendChild(option);
});

function addTable(value) {
    const selectElement = document.getElementById('table-body');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.value = value.place; // Set the value attribute
    td1.textContent = value.place; // Set the display text
    const td2 = document.createElement('td');
    td2.value = value.item; // Set the value attribute
    td2.textContent = value.item; // Set the display text
    const td3 = document.createElement('td');
    td3.value = value.method; // Set the value attribute
    td3.textContent = value.method; // Set the display text
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    // 결과 출력
    const td4 = document.createElement('td');
    if(value.result.type == 'no-code') {
        const resultText = value.result.text;
        const resultImage = value.result.image;
        if(resultImage != null) {
            const img = document.createElement('img');
            img.src = 'images/' + resultImage;
            img.alt = 'Image file';
            td4.appendChild(img);
        }
        if(resultText != null) {
            const textP = document.createElement('p');
            textP.value = resultText;
            textP.textContent = resultText;
            td4.appendChild(textP);
        }
    } else if(value.result.type == 'code') {
        const code = value.result.code;
        const codeId = value.place + "/-/" + value.item + "/-/" + value.method;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = codeId;
        td4.appendChild(input);
        const submitButton = document.createElement('button');
        submitButton.textContent = '입력';
        submitButton.id = codeId + '::' + 'button';
        submitButton.onclick = () => {
            const resultText = value.result.text;
            const resultImage = value.result.image;
            if(document.getElementById(codeId).value == code) {
                if(resultImage != null) {
                    const img = document.createElement('img');
                    img.src = 'images/' + resultImage;
                    img.alt = 'Image file';
                    td4.appendChild(img);
                }
                if(resultText != null) {
                    const textP = document.createElement('p');
                    textP.value = resultText;
                    textP.textContent = resultText;
                    td4.appendChild(textP);
                }
                document.getElementById(codeId).remove();
                document.getElementById(codeId + '::' + 'button').remove();
            } else {
                alert('잘못된 코드입니다.');
            }
        }
        td4.appendChild(submitButton);
    }
    tr.appendChild(td4);

    selectElement.appendChild(tr);
}

function startInvestigation() {
    // 각 셀렉트 요소의 선택된 값 가져오기
    const place = document.getElementById('place').value;
    const item = document.getElementById('item').value;
    const method = document.getElementById('method').value;
    
    // 결과 출력 (콘솔에)
    console.log(`장소: ${place}, 물품: ${item}, 수사방법: ${method}`);

    //결과 가져오기
    let result = null;
    list.results.forEach(value => {
        if(value.place == place && value.item == item && value.method == method)
            result = value.result;
    })
    if(result == null)
        return;

    addTable({
        place: place,
        item: item,
        method: method,
        result: result
    })

    //alert(`수사가 시작되었습니다! 장소: ${place}, 물품: ${item}, 수사방법: ${method}`);
}