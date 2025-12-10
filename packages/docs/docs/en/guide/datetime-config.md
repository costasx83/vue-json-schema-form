# Date Time Configuration
* For detailed configuration demo see: [Online Demo dateTime](https://form.lljj.me/#/demo?type=Date-DateTime)

:::warning
Configuring `format` for type `number` `array` breaks the `JSON Schema` specification
:::

Supports the following three `format` configurations for time and date

## format `date-time`
Renders using date-time format picker, `supports range selection`

* Supports configuring type `number` `string` `array`
* `string`: `2018-11-13T20:20:39+00:00` ISO string format
* `number`: `1595492397822` numeric timestamp format
* `array`: Use range selection

>* If type `array` is configured, then you must declare the type (`number` | `string`) in items type
>* As follows: Date time range selection, using `string` type

> ```json
> {
>   "dateTimeRange": {
>     "title": "Date Time Range Selection",
>     "type": "array",
>     "format": "date-time",
>     "items": {
>       "type": "string"
>     }
>     }
>  }
> ```

## format `date`
Renders using date format picker, `supports range selection`

* Supports configuring type `number` `string` `array`
* Same configuration as [format-date-time](#format-date-time)

## format `time`
* Only supports configuring type `string` format `16:04:41`
* Does not support range configuration
