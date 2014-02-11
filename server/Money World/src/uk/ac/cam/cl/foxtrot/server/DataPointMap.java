package uk.ac.cam.cl.foxtrot.server;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.annotation.XmlElement;

public class DataPointMap {
	private Map<String, DataPoint> dataPointMap = new HashMap<String, DataPoint>();

	@XmlElement(name="data")
	public Map<String, DataPoint> getDataPointMap() {
		return dataPointMap;
	}

	public void setDataPointMap(Map<String, DataPoint> dataPointMap) {
		this.dataPointMap = dataPointMap;
	}
}