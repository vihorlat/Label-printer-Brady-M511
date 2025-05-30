import BradySdk from 'brady-web-sdk'

// Pridaj do HTML (alebo dynamicky) pred spustením tohto kódu:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js"></script>
// pdfjsLib bude globálne dostupné

var statusLabel = document.getElementById('statusLabel')
const bradySdk = new BradySdk(printerUpdatesCallback, false)

var imageToPrint

const bleScanButton = document.getElementById('startBleScanButton')
bleScanButton.addEventListener('click', async function(e) {
    const loader = document.querySelector(".spinner-displayer")
    loader.classList.add("loader")

    if (await bradySdk.showDiscoveredBleDevices()) {
        statusLabel.innerText = "Successfully Connected!"
        statusLabel.style.color = "green"
    }
    else {
        statusLabel.innerText = "Failed to connect..."
        statusLabel.style.color = "red"
    }

    loader.classList.remove("loader")
    printerUpdatesCallback(null)
})

const printBrowserButton = document.getElementById('printBrowserPageButton')
printBrowserButton.addEventListener('click', async function(e) {
    location.href = "https://sdk.bradyid.com/PrintPage.html"
})

const feedButton = document.getElementById('feedButton')
feedButton.addEventListener('click', async function(e) {
    const loader = document.querySelector(".spinner-displayer")
    loader.classList.add("loader")

    const feedSuccessful = await bradySdk.feed()

    if(feedSuccessful) {
        statusLabel.innerText = "Feed Successful!"
        statusLabel.style.color = "green"
    }
    else {
        statusLabel.innerText = "Feed Failed..."
        statusLabel.style.color = "red"
    }

    loader.classList.remove("loader")
})

const cutButton = document.getElementById('cutButton')
cutButton.addEventListener('click', async function(e) {
    const loader = document.querySelector(".spinner-displayer")
    loader.classList.add("loader")

    const cutSuccessful = await bradySdk.cut()

    if(cutSuccessful) {
        statusLabel.innerText = "Cut Successful!"
        statusLabel.style.color = "green"
    }
    else {
        statusLabel.innerText = "Cut Failed..."
        statusLabel.style.color = "red"
    }

    loader.classList.remove("loader")
})

function printerUpdatesCallback(changedProperties) {
    statusLabel.style.color = "black"
    var detailsString = "";
    detailsString += "PrinterStatus:                         " + bradySdk.status + "\n";
    detailsString += "PrinterStatusMessage:                  " + bradySdk.message + "\n";
    detailsString += "PrinterStatusMessageTitle:             " + bradySdk.messageTitle + "\n";
    detailsString += "PrinterStatusRemedyExplanationMessage: " + bradySdk.messageRemedy + "\n";
    detailsString += "PrinterName:                           " + bradySdk.printerName + "\n";
    detailsString += "PrinterModel:                          " + bradySdk.printerModel + "\n";
    detailsString += "ConnectionType:                        BLE\n";
    detailsString += "BatteryLevelPercentage:                " + (bradySdk.batteryLevelPercentage == undefined ? "100%" : bradySdk.batteryLevelPercentage + "%") + "\n";
    detailsString += "Charging:                              " + bradySdk.isAcConnected + "\n";
    detailsString += "SupplyName:                            " + bradySdk.supplyName + "\n";
    detailsString += "SupplyYNumber:                         " + bradySdk.substrateYNumber + "\n";
    detailsString += "SupplyRemainingPercentage:             " + bradySdk.supplyRemainingPercentage + "%" + "\n";
    if (bradySdk.ribbonRemainingPercent) {
        detailsString += "RibbonRemainingPercentage:         " + bradySdk.ribbonRemainingPercent + "%" + "\n";
    }
    detailsString += "SupplyDimensions:                      " + bradySdk.supplyDimensions + "\n";
    detailsString += "SupplyWidth:                           " + bradySdk.substrateWidth + " inches" + "\n";
    detailsString += "SupplyHeight:                          " + bradySdk.substrateHeight + " inches" + "\n";
    detailsString += "SupplyIsDirectThermal:                 " + bradySdk.supplyIsDirectThermal + "\n";
    detailsString += "Dots Per Inch:                         " + bradySdk.dotsPerInch + "\n";
    detailsString += "Post Print Accessory:                  " + bradySdk.postPrintAccessoryType + "\n";
    detailsString += "IsSupplyPreSized:                      " + bradySdk.mediaIsDieCut + "\n";
    statusLabel.innerText = detailsString

    if (changedProperties != null && changedProperties.length != 0) {
        console.log("Changed Properties:")
        for(var property in changedProperties) {
            console.log("....." + changedProperties[property])
        }
    }

    if (!bradySdk.printerDiscovery.isConnected) {
        statusLabel.innerText = "Failed to connect..."
        statusLabel.style.color = "red"
    }

    if (!bradySdk.isSupportedBrowser()) {
        statusLabel.innerText = "This browser is not supported by the Web Bluetooth API."
        statusLabel.style.color = "red"
    }
}

const printBitmapButton = document.getElementById('printBitmapButton')
printBitmapButton.addEventListener('click', async function(e) {
    const loader = document.querySelector(".spinner-displayer")
    loader.classList.add("loader")

    const numCopies = document.getElementById('numCopies').value;
    if (numCopies && numCopies > 0) {
        bradySdk.setCopies(parseInt(numCopies))
    }

    const cutOptions = document.getElementById('cutOptions');
    const cutOption = cutOptions.value;
    if (cutOption === "EndOfJob") bradySdk.setCutOption(0);
    else if (cutOption === "EndOfLabel") bradySdk.setCutOption(1);
    else if (cutOption === "Never") bradySdk.setCutOption(2);
    else if (cutOption == "CutAfterRow") bradySdk.setCutOption(3);
    else if (cutOption == "UsePrinterSettings") bradySdk.setCutOption(4);

    let cutAfterRowOption = parseInt(document.getElementById("cutAfterRowOption").value);
    if (cutAfterRowOption) {
        bradySdk.setCutAfterRowValue(cutAfterRowOption)
    }

    const printingStatus = await bradySdk.printBitmap(imageToPrint, 0.2, 0.0)
    if(printingStatus) {
        statusLabel.innerText = "Printed Successfully!"
        statusLabel.style.color = "green"
    }
    else {
        statusLabel.innerText = "Failed to print..."
        statusLabel.style.color = "red"
    }

    loader.classList.remove("loader")
})

const disconnectButton = document.getElementById('disconnectButton')
disconnectButton.addEventListener('click', async function(e) {
    const disconnectStatus = await bradySdk.disconnect()
    if (disconnectStatus) {
        statusLabel.innerText = "Disconnected Successfully!"
        statusLabel.style.color = "green"
    }
    else {
        statusLabel.innerText = "Disconnect Failed..."
        statusLabel.style.color = "red"
    }
})

// VALID TYPES OF IMAGE FILES
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
  "application/pdf"  // pridane pre PDF
]

function validFileType(file) {
    return fileTypes.includes(file.type)
}

// PDF.JS: KONVERZIA PDF NA OBRÁZOK (PNG)
async function convertPdfToImage(file) {
    const arrayBuffer = await file.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1) // prvá strana

    const viewport = page.getViewport({ scale: 2 }) // scale = 2 pre lepšiu kvalitu

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({ canvasContext: context, viewport: viewport }).promise

    return canvas.toDataURL('image/png') // vráti base64 string PNG
}

const input = document.querySelector("input")
const preview = document.querySelector(".preview")

input.addEventListener('change', async function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild)
    }

    const curFiles = input.files
    if (curFiles.length === 0) {
        const para = document.createElement("p")
        para.textContent = "No files currently selected for upload"
        preview.appendChild(para)
    } else {
        const list = document.createElement("ol")
        preview.appendChild(list)

        for (const file of curFiles) {
            const listItem = document.createElement("li")
            const para = document.createElement("p")

            if (file.type === "application/pdf") {
                // Konvertuj PDF na obrázok
                try {
                    const imageDataUrl = await convertPdfToImage(file)
                    imageToPrint = document.createElement("img")
                    imageToPrint.src = imageDataUrl
                    localStorage.setItem("imageToPrint", imageDataUrl)
                    listItem.appendChild(imageToPrint)
                } catch (e) {
                    para.textContent = `Error converting PDF: ${e.message}`
                    listItem.appendChild(para)
                }
            }
            else if (validFileType(file)) {
                imageToPrint = document.createElement("img")
                imageToPrint.src = URL.createObjectURL(file)
                localStorage.setItem("imageToPrint", imageToPrint.src)
                listItem.appendChild(imageToPrint)
            } else {
                para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`
                listItem.appendChild(para)
            }

            list.appendChild(listItem)
        }
    }
})

window.toggleCutAfterRowOption = function toggleCutAfterRowOption() {
    const cutOptions = document.getElementById("cutOptions").value;
    const cutAfterRowContainer = document.getElementById("cutAfterRowContainer");

    if (cutOptions === "CutAfterRow") {
        cutAfterRowContainer.style.display = "block";
    } else {
        cutAfterRowContainer.style.display = "none";
    }
};



async function selectTemplate(templateName) {
    try {
        const response = await fetch(`/templates/${templateName}`);
        const arrayBuffer = await response.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const imageUrl = canvas.toDataURL("image/png");
        const img = document.createElement("img");
        img.src = imageUrl;
        imageToPrint = img;

        const preview = document.querySelector(".preview");
        preview.innerHTML = "";
        preview.appendChild(img);

        statusLabel.innerText = "Label loaded";
        statusLabel.style.color = "green";
    } catch (err) {
        console.error("Chyba pri načítaní šablóny:", err);
        statusLabel.innerText = "Failed to load label";
        statusLabel.style.color = "red";
    }
}
window.selectTemplate = selectTemplate;
