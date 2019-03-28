function pruneClass(className, classNames) {
    console.log("pruneClass", className, "from", classNames)
    if (!classNames) {
        return ""
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    console.log("search for", className, "in", classNames, "result", classIndex)

    if (classIndex !== -1) {
        console.log("remove from array")
        classes.splice(classIndex, 1)
    }
    console.log("after", classes)

    if (classes.length > 0) {
        console.log("return joined classes", classes)
        return classes.join(" ")
    } else {
        console.log("return empty className")
        return ""
    }
}

function addClass(className, classNames) {
    console.log("addClass", className, classNames)
    if (!classNames) {
        classNames = ""
    }

    classNames = classNames.trim()

    if (!className) {
        return classNames
    }

    className = className.trim()

    var classes = classNames.split(" "),
        classIndex = classes.indexOf(className)

    if (classIndex === -1) {
        if (classNames) {
            return classNames + " " + className
        } else {
            return className
        }
    }
}

module.exports = {
    pruneClass: pruneClass,
    addClass: addClass
}